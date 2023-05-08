module Spec where

import MarsRover

import Test.Hspec
import Test.QuickCheck


main :: IO ()
main = hspec $ do
  describe "When a rover previously facing north just rotated left" $ do
    it "it should be facing west" $ do
      moved (Rover (Position 0 0) North) RotateLeft 
        `shouldBe` Rover (Position 0 0) West
