document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
  const reveal = () => document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 45) el.classList.add("visible");
  });
  reveal(); addEventListener("scroll", reveal, {passive:true});

  const params = new URLSearchParams(location.search);
  const requestedType = params.get("type");
  const typeSelect = document.querySelector('[name="request_type"]');
  if (typeSelect && requestedType) {
    const map = {idea:"Submit a Project Idea",quote:"Request a Quote",solicitation:"Government / RFP / RFQ / RFI"};
    if (map[requestedType]) typeSelect.value = map[requestedType];
  }

  function mail(subject, body) {
    location.href = "mailto:info@ngtconsultations.org?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  const rf = document.querySelector("[data-request-form]");
  if (rf) rf.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(rf);
    const body = [
      "Request Type: " + (d.get("request_type")||""),
      "Name: " + (d.get("name")||""),
      "Organization / Agency: " + (d.get("organization")||""),
      "Email: " + (d.get("email")||""),
      "Phone: " + (d.get("phone")||""),
      "Service Area: " + (d.get("service")||""),
      "Desired Start Date: " + (d.get("start_date")||""),
      "Budget Range: " + (d.get("budget")||""),
      "Project / Requirement Title: " + (d.get("title")||""),
      "Solicitation / Reference Number: " + (d.get("solicitation")||""),
      "Reference Link: " + (d.get("reference_url")||""),
      "Proposal Due Date: " + (d.get("due_date")||""),
      "",
      "Need / Idea / Desired Outcome:",
      d.get("details")||""
    ].join("\n");
    mail("NGT Request: " + (d.get("title") || d.get("request_type") || "New Inquiry"), body);
  });

  const af = document.querySelector("[data-appointment-form]");
  if (af) af.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(af);
    const body = [
      "Name: " + (d.get("name")||""),
      "Email: " + (d.get("email")||""),
      "Phone: " + (d.get("phone")||""),
      "Consultation Area: " + (d.get("service")||""),
      "Preferred Date: " + (d.get("date")||""),
      "Preferred Time: " + (d.get("time")||""),
      "Meeting Preference: " + (d.get("meeting")||""),
      "",
      "Goal:",
      d.get("goal")||""
    ].join("\n");
    mail("NGT Consultation Request", body);
  });
});
