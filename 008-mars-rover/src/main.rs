use unindent::unindent;

#[derive(Debug, Default, PartialEq, Eq, Clone)]
enum Orientation {
    South,
    #[default]
    North,
    East,
    West,
}

#[derive(Debug, Default, PartialEq, Eq, Clone)]
struct Position {
    x: i64,
    y: i64,
}

impl Position {
    fn new(x: i64, y: i64) -> Self {
        Self { x, y }
    }
}

#[derive(Debug, Default, PartialEq, Eq, Clone)]
struct Rover {
    position: Position,
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

        for (y, line) in input.lines().enumerate() {
            let mut row = Vec::new();
            for (x, chr) in line.chars().enumerate() {
                let cell = match chr {
                    '🟩' => Ok(Some(Cell::Empty)),
                    '\u{27A1}' => Ok(Some(Cell::WithRover(Rover::new(
                        Position::new(x as i64, y as i64),
                        Orientation::East,
                    )))),
                    '\u{2B06}' => Ok(Some(Cell::WithRover(Rover::new(
                        Position::new(x as i64, y as i64),
                        Orientation::North,
                    )))),
                    '\u{2B05}' => Ok(Some(Cell::WithRover(Rover::new(
                        Position::new(x as i64, y as i64),
                        Orientation::West,
                    )))),
                    '\u{2B63}' => Ok(Some(Cell::WithRover(Rover::new(
                        Position::new(x as i64, y as i64),
                        Orientation::South,
                    )))),
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

    fn new(position: Position, orientation: Orientation) -> Self {
        Self {
            position,
            orientation,
        }
    }

    fn get_initial_position(input: &str) -> Option<Self> {
        for (line, y) in input.lines().zip(0..) {
            for (chr, x) in line.chars().zip(0..) {
                match chr {
                    '\u{27A1}' => return Some(Self::new(Position::new(x, y), Orientation::East)),
                    _ => continue,
                }
            }
        }

        None
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
    use crate::Position;
    use crate::Rover;
    use crate::parse_instructions;

    fn empty() -> Cell {
        Cell::Empty
    }

    fn cell_with_obstacle() -> Cell {
        Cell::WithObstacle
    }

    fn cell_with_rover(position: Position, orientation: Orientation) -> Cell {
        Cell::WithRover(Rover::new(position, orientation))
    }

    #[test]
    fn rover_initial_state() {
        assert_eq!(
            Rover::default(),
            Rover {
                position: Position { x: 0, y: 0 },
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
            assert_eq!(
                rover,
                Rover {
                    position: Position { x: 0, y: 0 },
                    orientation,
                },
            );
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
            assert_eq!(
                rover,
                Rover {
                    position: Position { x: 0, y: 0 },
                    orientation,
                },
            );
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
                        cell_with_rover(Position::new(0, 4), Orientation::North),
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
                        cell_with_rover(Position::new(2, 1), Orientation::South),
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
                        cell_with_rover(Position::new(0, 4), Orientation::East),
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
                        cell_with_rover(Position::new(2, 1), Orientation::West),
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
    fn get_initial_rover() {
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
            Rover::get_initial_position(input),
            Some(Rover::new(Position { x: 0, y: 4 }, Orientation::East))
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
}
