{
  description = "A flake for the brewy project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: let
    # Import the local package
    brewy = nixpkgs.callPackage ./default.nix {};

  in {
    # Expose the package for building and running
    packages.x86_64-linux = brewy;
    packages.darwin = brewy;

    # Default app to run
    defaultPackage.x86_64-linux = brewy;
    defaultPackage.aarch64-linux = brewy;
    defaultPackage.darwin = brewy;
  };
}