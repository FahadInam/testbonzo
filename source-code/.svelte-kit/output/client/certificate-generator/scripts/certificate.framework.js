loadCSS("../scripts/certificate.common.css");
loadScript(
  "https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js",
  () => {
    document.body.innerHTML += `
    <div class="btn-container" style="margin-right: 60px;">
        <button id="download">Download</button>
    </div>`;

    onLoad();
  }
);

function onLoad() {
  document.getElementById("download").addEventListener("click", function () {
    // Set fixed size for PDF generation
    var element = document.getElementById("certificate");
    window.scrollTo(0, 0); // to scroll towards left most to avoid clipping while printing at smaller screens.

    // Temporarily apply fixed dimensions for PDF generation
    element.style.width = "800px";
    element.style.height = "600px";

    var opt = {
      margin: 0, // Remove margins
      filename: "certificate.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "px", format: [800, 600], orientation: "landscape" },
    };

    // Generate the PDF
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        // Restore responsive size after generating PDF
        element.style.width = "";
        element.style.height = "";
      });
  });
}

function loadScript(url, callback) {
  // Create a script element
  const script = document.createElement("script");
  script.src = url;
  script.type = "text/javascript";
  script.async = true;

  // Optional: Add a callback function for when the script is loaded
  script.onload = function () {
    if (callback) callback();
  };

  // Add error handling
  script.onerror = function () {
    console.error(`Failed to load script: ${url}`);
  };

  // Append the script to the document's head or body
  document.head.appendChild(script); // or document.body.appendChild(script);
}

function loadCSS(url) {
  // Create a link element
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.type = "text/css";

  // Add error handling
  link.onerror = function () {
    console.error(`Failed to load CSS: ${url}`);
  };

  // Append the link element to the head of the document
  document.head.appendChild(link);
}
