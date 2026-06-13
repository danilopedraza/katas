use unindent::unindent;

#[derive(Debug, Default, PartialEq, Eq, Clone, Copy)]
enum Orientation {
    South,
    #[default]
    North,
    East,
    West,
}

impl Orientation {
    fn delta(&self) -> (isize, isize) {
        match self {
            Orientation::South => (0, 1),
            Orientation::North => (0, -1),
            Orientation::East => (1, 0),
            Orientation::West => (-1, 0),
        }
    }
}

#[derive(Debug, Default, PartialEq, Eq, Clone)]
struct Rover {
    orientation: Orientation,
}

#[derive(Debug, PartialEq, Eq, Clone)]
enum Cell {
    Empty,
    WithRover(Rover),
    WithObstacle,
}

#[derive(Debug, PartialEq, Eq, Clone)]
enum Instruction {
    MoveForward,
    TurnLeft,
    TurnRight,
}

fn parse_instructions(input: &str) -> Vec<Instruction> {
    let mut instructions = Vec::new();
    for c in input.chars() {
        match c {
            '\u{2B06}' => instructions.push(Instruction::MoveForward),
            '\u{27A1}' => instructions.push(Instruction::TurnRight),
            '\u{2B05}' => instructions.push(Instruction::TurnLeft),
            _ => continue,
        }
    }
    instructions
}

#[derive(Debug, PartialEq, Eq, Clone)]
struct Map {
    data: Vec<Vec<Cell>>,
    rover_instructions: Vec<Instruction>,
}

impl Map {
    fn parse(input: &str, rover_instructions: Vec<Instruction>) -> Result<Self, ()> {
        let mut data = Vec::new();

        for line in input.lines() {
            let mut row = Vec::new();
            for chr in line.chars() {
                let cell = match chr {
                    '🟩' => Ok(Some(Cell::Empty)),
                    '\u{27A1}' => Ok(Some(Cell::WithRover(Rover::new(Orientation::East)))),
                    '\u{2B06}' => Ok(Some(Cell::WithRover(Rover::new(Orientation::North)))),
                    '\u{2B05}' => Ok(Some(Cell::WithRover(Rover::new(Orientation::West)))),
                    '\u{2B63}' => Ok(Some(Cell::WithRover(Rover::new(Orientation::South)))),
                    '🌳' => Ok(Some(Cell::WithObstacle)),
                    '\u{FE0F}' => Ok(None), // Unicode shenanigans
                    _ => Err(()),
                }?;

                if let Some(cell) = cell {
                    row.push(cell)
                }
            }
            data.push(row);
        }

        Ok(Self {
            data,
            rover_instructions,
        })
    }

    fn iterate_once(&mut self) {
        match self.rover_instructions.pop() {
            None => return,
            Some(Instruction::MoveForward) => {
                let (cur_x, cur_y) = (0, 0);
                let (dx, dy) = if let Cell::WithRover(rover) = &self.data[cur_y][cur_x] {
                    rover.orientation.delta()
                } else {
                    unreachable!()
                };
                let (new_x, new_y) = (
                    (cur_x as isize + dx) as usize,
                    (cur_y as isize + dy) as usize,
                );

                if let Cell::WithObstacle = &self.data[new_y][new_x] {
                    return;
                }

                if let Cell::WithRover(rover) = &self.data[cur_y][cur_x] {
                    let new_orientation = rover.orientation;
                    let new_rover = Rover::new(new_orientation);
                    self.data[new_y][new_x] = Cell::WithRover(new_rover);
                    self.data[cur_y][cur_x] = Cell::Empty;
                }
            }
            Some(Instruction::TurnLeft) => todo!(),
            Some(Instruction::TurnRight) => todo!(),
        }
    }
}

impl Rover {
    fn rotate_left(self) -> Self {
        let new_orientation = match self.orientation {
            Orientation::North => Orientation::West,
            Orientation::West => Orientation::South,
            Orientation::South => Orientation::East,
            Orientation::East => Orientation::North,
        };

        Self {
            orientation: new_orientation,
            ..self
        }
    }

    fn rotate_right(self) -> Self {
        let new_orientation = match self.orientation {
            Orientation::North => Orientation::East,
            Orientation::East => Orientation::South,
            Orientation::South => Orientation::West,
            Orientation::West => Orientation::North,
        };

        Self {
            orientation: new_orientation,
            ..self
        }
    }

    fn new(orientation: Orientation) -> Self {
        Self { orientation }
    }
}

fn main() {
    let instructions = parse_instructions("⬆️➡️⬅️");
    let _map = Map::parse(
        &unindent(
            "
            🟩🟩🌳🟩🟩
            🟩🟩🟩🟩🟩
            🟩🟩🟩🌳🟩
            🟩🌳🟩🟩🟩
            ➡️🟩🟩🟩🟩
        ",
        ),
        instructions,
    )
    .expect("Failed parsing the map");
}

#[cfg(test)]
mod tests {
    use unindent::unindent;

    use crate::Cell;
    use crate::Instruction;
    use crate::Map;
    use crate::Orientation;
    use crate::Rover;
    use crate::parse_instructions;

    fn empty() -> Cell {
        Cell::Empty
    }

    fn cell_with_obstacle() -> Cell {
        Cell::WithObstacle
    }

    fn cell_with_rover(orientation: Orientation) -> Cell {
        Cell::WithRover(Rover::new(orientation))
    }

    #[test]
    fn rover_initial_state() {
        assert_eq!(
            Rover::default(),
            Rover {
                orientation: Orientation::North
            },
        );
    }

    #[test]
    fn rotate_left_360() {
        let expected_orientations = [
            Orientation::West,
            Orientation::South,
            Orientation::East,
            Orientation::North,
        ];

        let mut rover = Rover::default();
        for orientation in expected_orientations {
            rover = rover.rotate_left();
            assert_eq!(rover, Rover { orientation },);
        }
    }

    #[test]
    fn rotate_right_360() {
        let expected_orientations = [
            Orientation::East,
            Orientation::South,
            Orientation::West,
            Orientation::North,
        ];

        let mut rover = Rover::default();
        for orientation in expected_orientations {
            rover = rover.rotate_right();
            assert_eq!(rover, Rover { orientation },);
        }
    }

    #[test]
    fn parse_map_north() {
        let input = &unindent(
            "
            🟩🟩🌳🟩🟩
            🟩🟩🟩🟩🟩
            🟩🟩🟩🌳🟩
            🟩🌳🟩🟩🟩
            ⬆🟩🟩🟩🟩
        ",
        );

        assert_eq!(
            Map::parse(input, vec![]),
            Ok(Map {
                data: vec![
                    vec![empty(), empty(), cell_with_obstacle(), empty(), empty()],
                    vec![empty(), empty(), empty(), empty(), empty()],
                    vec![empty(), empty(), empty(), cell_with_obstacle(), empty()],
                    vec![empty(), cell_with_obstacle(), empty(), empty(), empty()],
                    vec![
                        cell_with_rover(Orientation::North),
                        empty(),
                        empty(),
                        empty(),
                        empty()
                    ],
                ],
                rover_instructions: vec![],
            })
        );
    }

    #[test]
    fn parse_map_south() {
        let input = &unindent(
            "
            🟩🟩🌳🟩🟩
            🟩🟩⭣🟩🟩
            🟩🟩🟩🌳🟩
            🟩🌳🟩🟩🟩
            🟩🟩🟩🟩🟩
        ",
        );

        assert_eq!(
            Map::parse(input, vec![]),
            Ok(Map {
                data: vec![
                    vec![empty(), empty(), cell_with_obstacle(), empty(), empty()],
                    vec![
                        empty(),
                        empty(),
                        cell_with_rover(Orientation::South),
                        empty(),
                        empty()
                    ],
                    vec![empty(), empty(), empty(), cell_with_obstacle(), empty()],
                    vec![empty(), cell_with_obstacle(), empty(), empty(), empty()],
                    vec![empty(), empty(), empty(), empty(), empty()],
                ],
                rover_instructions: vec![],
            })
        );
    }

    #[test]
    fn parse_map_east() {
        let input = &unindent(
            "
            🟩🟩🌳🟩🟩
            🟩🟩🟩🟩🟩
            🟩🟩🟩🌳🟩
            🟩🌳🟩🟩🟩
            ➡️🟩🟩🟩🟩
        ",
        );

        assert_eq!(
            Map::parse(input, vec![]),
            Ok(Map {
                data: vec![
                    vec![empty(), empty(), cell_with_obstacle(), empty(), empty()],
                    vec![empty(), empty(), empty(), empty(), empty()],
                    vec![empty(), empty(), empty(), cell_with_obstacle(), empty()],
                    vec![empty(), cell_with_obstacle(), empty(), empty(), empty()],
                    vec![
                        cell_with_rover(Orientation::East),
                        empty(),
                        empty(),
                        empty(),
                        empty()
                    ],
                ],
                rover_instructions: vec![],
            })
        );
    }

    #[test]
    fn parse_map_west() {
        let input = &unindent(
            "
            🟩🟩🌳🟩🟩
            🟩🟩⬅🟩🟩
            🟩🟩🟩🌳🟩
            🟩🌳🟩🟩🟩
            🟩🟩🟩🟩🟩
        ",
        );

        assert_eq!(
            Map::parse(input, vec![]),
            Ok(Map {
                data: vec![
                    vec![empty(), empty(), cell_with_obstacle(), empty(), empty()],
                    vec![
                        empty(),
                        empty(),
                        cell_with_rover(Orientation::West),
                        empty(),
                        empty()
                    ],
                    vec![empty(), empty(), empty(), cell_with_obstacle(), empty()],
                    vec![empty(), cell_with_obstacle(), empty(), empty(), empty()],
                    vec![empty(), empty(), empty(), empty(), empty()],
                ],
                rover_instructions: vec![],
            })
        );
    }

    #[test]
    fn parse_empty_instructions() {
        let input = "";
        assert_eq!(parse_instructions(input), vec![]);
    }

    #[test]
    fn parse_single_instruction_move_forward() {
        let input = "⬆️";
        assert_eq!(parse_instructions(input), vec![Instruction::MoveForward]);
    }

    #[test]
    fn parse_multiple_instructions() {
        let input = "⬆️➡️⬅️";
        assert_eq!(
            parse_instructions(input),
            vec![
                Instruction::MoveForward,
                Instruction::TurnRight,
                Instruction::TurnLeft
            ]
        );
    }

    #[test]
    fn no_move() {
        let mut map = Map {
            data: vec![],
            rover_instructions: vec![],
        };

        map.iterate_once();

        assert_eq!(
            map,
            Map {
                data: vec![],
                rover_instructions: vec![]
            }
        );
    }

    #[test]
    fn simple_move() {
        let mut map = Map {
            data: vec![vec![cell_with_rover(Orientation::East), empty()]],
            rover_instructions: vec![Instruction::MoveForward],
        };

        map.iterate_once();

        assert_eq!(
            map,
            Map {
                data: vec![vec![empty(), cell_with_rover(Orientation::East),]],
                rover_instructions: vec![],
            }
        );
    }

    #[test]
    fn simple_move_with_obstacle() {
        let mut map = Map {
            data: vec![vec![
                cell_with_rover(Orientation::East),
                cell_with_obstacle(),
            ]],
            rover_instructions: vec![Instruction::MoveForward],
        };

        map.iterate_once();

        assert_eq!(
            map,
            Map {
                data: vec![vec![
                    cell_with_rover(Orientation::East),
                    cell_with_obstacle()
                ],],

                rover_instructions: vec![],
            }
        );
    }

    #[test]
    fn move_south() {
        let mut map = Map {
            data: vec![vec![cell_with_rover(Orientation::South)], vec![empty()]],
            rover_instructions: vec![Instruction::MoveForward],
        };

        map.iterate_once();

        assert_eq!(
            map,
            Map {
                data: vec![vec![empty(),], vec![cell_with_rover(Orientation::South),]],
                rover_instructions: vec![],
            }
        );
    }
}
