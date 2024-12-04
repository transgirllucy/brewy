class Brewy < Formula
    desc "Description of your project"
    homepage "https://github.com/transgirllucy/brewy"
    url "https://github.com/transgirllucy/brewy/releases/download/alpha/binaries.tar.gz"
    sha256 "6f1d590b3d258dc9605ff41e78093a2a88b7beb0b0d79ad4b5fd1b85bcca416e"
  
    def install
      if OS.mac?
        if Hardware::CPU.arm?
          bin.install "dist/brewy-darwin-arm64" => "brewy"
        elsif Hardware::CPU.intel?
          bin.install "dist/brewy-darwin-x64" => "brewy"
        end
      elsif OS.linux?
        if Hardware::CPU.intel
            bin.install "dist/brewy-linux" => "brewy"
      end
    end
  
    test do
      system "#{bin}/brewy", "version" # Adjust this to a valid command for testing
    end
  end