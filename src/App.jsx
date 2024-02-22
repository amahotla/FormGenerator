import { useEffect, useState } from "react";
import "./App.css";

const htmlForm = `<!DOCTYPE html>
<html>
  <head>
    <title>Session Booking Form</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }
      form {
        margin: auto;
        padding: 20px;
        max-width: 500px;
        display: grid;
        grid-gap: 10px;
      }
      .red-outline:focus {
        outline: 2px solid red;
      }
      input,
      select {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
      }
      input[type="submit"] {
        background-color: #ffd700;
        color: white;
        cursor: pointer;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add shadow */
        transition: all 0.3s ease; /* Optional: Add smooth hover effect */
        background-size: 200% auto;
        background-image: linear-gradient(
          60deg,
          #7ed321,
          #17b978,
          #a7ff83
        ) !important;
        -webkit-animation: animatedgradient 3s ease infinite alternate;
        animation: animatedgradient 3s ease infinite alternate;
        background-size: 300% 300%;
      }
      @keyframes animatedgradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      /* input[type="submit"]:hover {
        background-color: #3E8E41;
        color: white;
      } */
      input[type="submit"]:hover {
        transform: scale(1.02);
        transform: translateY(-2px); /* Optional: Add slight lift on hover */
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
        animation: unset;
      }
      input[type="submit"]:disabled {
        opacity: 50%;
      }
      select {
        appearance: none;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: url("https://icon-library.com/images/dropdown-arrow-icon/dropdown-arrow-icon-11.jpg");
        background-size: 0.2em;
        /* background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M81.1 213.9l74.8 74.8c4.7 4.7 12.3 4.7 17 0l74.8-74.8c4.7-4.7 4.7-12.3 0-17l-9.9-9.9c-4.7-4.7-12.3-4.7-17 0L256 251.2l-51.8-51.8c-4.7-4.7-12.3-4.7-17 0l-9.9 9.9c-4.7 4.7-4.7 12.3 0 17zM400 192h-96c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16z"></path></svg>'); */
        background-repeat: no-repeat;
        background-position: 97%;
        background-size: 18px;
        padding-right: 30px;
      }
      .name {
        background-image: url(https://go.kewalkishan.com/images/name2.png);
        background-repeat: no-repeat;
        background-position: 97%;
      }
      .email {
        background-image: url(https://go.kewalkishan.com/images/email2.png);
        background-repeat: no-repeat;
        background-position: 97%;
      }
      .phone {
        background-image: url(https://go.kewalkishan.com/images/phone2.png);
        background-repeat: no-repeat;
        background-position: 97%;
      }
    </style>
  </head>
  <body>
    <form method="post" name="google-sheet">
      <input type="text" placeholder="Name" name="name" class="name" required />
      <input
        type="email"
        placeholder="Email"
        name="email"
        class="email"
        required
      />
      <input
        type="tel"
        required
        pattern="[0-9]{10}"
        placeholder="10 Digit Mobile Number"
        name="phone"
        class="phone"
        oninvalid="this.setCustomValidity('Please enter a 10-digit phone number')"
        oninput="this.setCustomValidity('')"
      />
      <input type="submit" value="Submit" id="submit_button" />
    </form>
    <script>
      const form = document.forms["google-sheet"];
      const submitButton = document.getElementById("submit_button");

      function updateSubmitButton() {
        const nameValue = form.name.value.trim();
        const emailValue = form.email.value.trim();
        const phoneValue = form.phone.value.trim();

        const isNotEmpty =
          nameValue.length > 0 &&
          emailValue.length > 0 &&
          phoneValue.length > 0;
        submitButton.disabled = !isNotEmpty;
      }

      // Add event listeners to update the submit button status on input
      form.name.addEventListener("input", updateSubmitButton);
      form.email.addEventListener("input", updateSubmitButton);
      form.phone.addEventListener("input", updateSubmitButton);

      // Initial check to disable the button if any input is empty
      updateSubmitButton();

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitButton = document.getElementById("submit_button");
        submitButton.disabled = true;
        submitButton.value = "Submitting...";
        // document.querySelector("#submit_button").disabled = true;
        const urlParams = new URLSearchParams(window.location.search);
        const utm_source = urlParams.get("utm_source");
        const utm_medium = urlParams.get("utm_medium");
        const utm_campaign = urlParams.get("utm_campaign");
        const utm_adgroup = urlParams.get("utm_adgroup");
        const utm_content = urlParams.get("utm_content");
        const utm_term = urlParams.get("utm_term");
        const utm_id = urlParams.get("utm_id");
        const adsetname = urlParams.get("adset name");
        const adname = urlParams.get("ad name");

        const formData = {
          name: form.name.value,
          email: form.email.value,
          phone: form.phone.value,
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_campaign: utm_campaign,
          utm_adgroup: utm_adgroup,
          utm_content: utm_content,
          utm_term: utm_term,
          utm_id: utm_id,
          adsetname: adsetname,
          adname: adname,
          landingPageSource: window.location.href,
        };
        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          window.location.href = redirectUrl;
        } catch (error) {
          alert("Error occurred, please try again...");
          console.error("Error!", error.message);
        }
      });
    </script>
  </body>
</html>
`;

function App() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [modifiedForm, setModifiedForm] = useState(htmlForm);
  const [displayHtmlCode, setDisplayHtmlCode] = useState(false);

  useEffect(() => {
    if (webhookUrl.length > 0 && redirectUrl.length > 0) setIsDisabled(false);
    else setIsDisabled(true);
  }, [webhookUrl, redirectUrl]);

  const handleSetData = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!webhookUrl.match(urlPattern) || !redirectUrl.match(urlPattern)) {
      alert("Please enter valid URLs for Webhook and Redirect.");
      return;
    }

    // Adding quotes around the URLs
    const quotedWebhookUrl = `"${webhookUrl}"`;
    const quotedRedirectUrl = `"${redirectUrl}"`;

    // Replace placeholders with quoted URLs in the HTML form
    let modifiedHtmlForm = htmlForm.replace("webhookUrl", quotedWebhookUrl);
    modifiedHtmlForm = modifiedHtmlForm.replace(
      "redirectUrl",
      quotedRedirectUrl
    );
    setModifiedForm(modifiedHtmlForm);
    setDisplayHtmlCode(true);
    // Additional logic to utilize modifiedHtmlForm as needed (e.g., rendering in an iframe or opening in a new window)
  };

  return (
    <div>
      <h1 className="text-4xl font-medium mb-10">Unpaid Form</h1>
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSetData}
      >
        <label>
          Webhook Url:{" "}
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
        </label>
        <label>
          Redirect Url:{" "}
          <input
            type="text"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Set Data"
          className="bg-green-500 rounded-lg mt-2 disabled:opacity-50 cursor-pointer w-48"
          disabled={isDisabled}
        />
      </form>
      <div className="mt-10">{displayHtmlCode ? modifiedForm : null}</div>
    </div>
  );
}

export default App;
