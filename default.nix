{ pkgs ? import <nixpkgs> {} }:

let
  # Define the version and the base URL for the binaries
  version = "1.0.0";
  baseUrl = "https://github.com/transgirllucy/brewy/releases/download/${version}";

  # Function to determine the binary URL and SHA256 based on the system
  getBinaryInfo = pkgs: {
    inherit (pkgs.stdenv) isDarwin isAarch64;

    url = if isDarwin then
      if isAarch64 then "${baseUrl}/brewy-darwin-arm64"
      else "${baseUrl}/brewy-darwin-x64"
    else "${baseUrl}/brewy-linux-x64";

    sha256 = if isDarwin then
      if isAarch64 then "672e8250fe54a41675f029eadb053bb238268ecda93bbe4803503c8a523a1726"
      else "653192ecfa71ce38a31dc1bc57729c278e4cdcb891560d20c58c326b7bb61df3"
    else "7dc8659cd61fe62f68293de13f53168c83bb77dd3294ba50cdb9d1e6f721e8c2";
  };

  binaryInfo = getBinaryInfo pkgs;

in

pkgs.stdenv.mkDerivation {
  pname = "brewy";
  inherit version;

  src = pkgs.fetchurl {
    url = binaryInfo.url;
    sha256 = binaryInfo.sha256;
  };

  installPhase = ''
    mkdir -p $out/bin
    cp $src $out/bin/brewy
    chmod +x $out/bin/brewy
  '';

  meta = with pkgs.lib; {
    description = "A description of your project";
    homepage = "https://github.com/transgirllucy/brewy";
    license = licenses.mit;  # Adjust this to the actual license of your project
    maintainers = with maintainers; [ yourName ];  # Replace with your name or GitHub handle
  };
}