import { DownloadSwatch } from "./DownloadSwatch.jsx";

export default function (view) {
  view.description =
    "Generates a swatch PNG for the current color and downloads it. Useful for saving your favorite colors for later.";

  return <DownloadSwatch />;
}
