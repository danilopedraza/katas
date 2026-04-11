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
    Occupied,
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
}

impl Map {
    fn parse(input: &str) -> Result<Self, ()> {
        let mut data = Vec::new();

        for line in input.lines() {
            let mut row = Vec::new();
            for chr in line.chars() {
                let cell = match chr {
                    '🟩' => Ok(Some(Cell::Empty)),
                    '\u{27A1}' => Ok(Some(Cell::Empty)),
                    '🌳' => Ok(Some(Cell::Occupied)),
                    '\u{FE0F}' => Ok(None),
                    _ => Err(()),
                }?;

                if let Some(cell) = cell {
                    row.push(cell)
                }
            }
            data.push(row);
        }

        Ok(Self { data })
    }
}

impl Rover {
    fn rotate_left(&self) -> Self {
        let new_orientation = match self.orientation {
            Orientation::North => Orientation::West,
            Orientation::West => Orientation::South,
            Orientation::South => Orientation::East,
            Orientation::East => Orientation::North,
        };

        Self {
            orientation: new_orientation,
            ..self.to_owned()
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
}

impl Rover {
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
    println!("Hello, world!");
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

    fn occupied() -> Cell {
        Cell::Occupied
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
    fn parse_map() {
        let input = &unindent("
            🟩🟩🌳🟩🟩
            🟩🟩🟩🟩🟩
            🟩🟩🟩🌳🟩
            🟩🌳🟩🟩🟩
            ➡️🟩🟩🟩🟩
        ");

        assert_eq!(
            Map::parse(input),
            Ok(Map {
                data: vec![
                    vec![empty(), empty(), occupied(), empty(), empty()],
                    vec![empty(), empty(), empty(), empty(), empty()],
                    vec![empty(), empty(), empty(), occupied(), empty()],
                    vec![empty(), occupied(), empty(), empty(), empty()],
                    vec![empty(), empty(), empty(), empty(), empty()],
                ],
            })
        );
    }

    #[test]
    fn get_initial_rover() {
        let input = &unindent("
            🟩🟩🌳🟩🟩
            🟩🟩🟩🟩🟩
            🟩🟩🟩🌳🟩
            🟩🌳🟩🟩🟩
            ➡️🟩🟩🟩🟩
        ");

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
