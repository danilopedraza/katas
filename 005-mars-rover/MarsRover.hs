module MarsRover where

data Orientation = North | East | South | West deriving(Show, Eq)
data Direction = Left | Right deriving(Show, Eq)
data Movement = MoveForward | RotateLeft | RotateRight deriving(Show, Eq)

data Position = Position {
    x :: Int,
    y :: Int
} deriving(Show, Eq)

data Rover = Rover {
    position :: Position, 
    orientation :: Orientation
} deriving(Show, Eq)

moved :: Rover -> Movement -> Rover
moved (Rover (Position x y) North) RotateLeft = Rover (Position x y) West
