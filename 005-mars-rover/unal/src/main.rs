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
}

fn main() {
    println!("Hello, world!");
}

#[cfg(test)]
mod tests {
    use crate::Orientation;
    use crate::Position;
    use crate::Rover;

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
}
