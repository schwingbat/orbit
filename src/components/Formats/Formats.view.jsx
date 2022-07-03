import { Formats } from "./Formats.jsx";

export default function (view) {
  view.description =
    "Displays the current color in several different formats for copying to the clipboard.";

  return <Formats />;
}
