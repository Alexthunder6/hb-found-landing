import fs from "node:fs";
import path from "node:path";

export default function HomePage() {
  const htmlPath = path.join(process.cwd(), "code.html");
  const imagePaths = [
    { fileName: "Hands.png", token: /src="Hands\.png"/g },
    { fileName: "HabenskyCard.png", token: /src="HabenskyCard\.png"/g },
    { fileName: "OncobrainCard.png", token: /src="OncobrainCard\.png"/g },
    { fileName: "MarkovCard.png", token: /src="MarkovCard\.png"/g },
    { fileName: "PotaninCard.png", token: /src="PotaninCard\.png"/g }
  ];
  let html = fs.readFileSync(htmlPath, "utf8");

  imagePaths.forEach(({ fileName, token }) => {
    const filePath = path.join(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) return;

    const imageBase64 = fs.readFileSync(filePath).toString("base64");
    const imageDataUrl = `data:image/png;base64,${imageBase64}`;
    html = html.replace(token, `src="${imageDataUrl}"`);
  });

  return (
    <iframe
      srcDoc={html}
      title="HB Found Landing"
      style={{
        width: "100%",
        minHeight: "100vh",
        border: "none",
        display: "block"
      }}
    />
  );
}
