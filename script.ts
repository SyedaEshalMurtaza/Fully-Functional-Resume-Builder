import html2pdf from "html2pdf.js";

interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    username: string;
}

interface Education {
    degree: string;
    school: string;
    graduationYear: string;
}

interface WorkExperience {
    company: string;
    role: string;
    responsibilities: string;
}

interface ResumeData {
    personalInfo: PersonalInfo;
    education: Education;
    skills: string[];
    workExperience: WorkExperience;
}

// Function to capture and display resume data
function generateResume() {
    const resumeData: ResumeData = {
        personalInfo: {
            name: (document.getElementById("name") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
            phone: (document.getElementById("phone") as HTMLInputElement).value,
            username: (document.getElementById("username") as HTMLInputElement).value
        },
        education: {
            degree: (document.getElementById("degree") as HTMLInputElement).value,
            school: (document.getElementById("school") as HTMLInputElement).value,
            graduationYear: (document.getElementById("graduationYear") as HTMLInputElement).value
        },
        skills: (document.getElementById("skills") as HTMLTextAreaElement).value.split(","),
        workExperience: {
            company: (document.getElementById("company") as HTMLInputElement).value,
            role: (document.getElementById("role") as HTMLInputElement).value,
            responsibilities: (document.getElementById("responsibilities") as HTMLTextAreaElement).value
        }
    };
    displayResume(resumeData);
}

// Function to dynamically render resume
function displayResume(data: ResumeData) {
    const preview = document.getElementById("resumePreview")!;
    preview.innerHTML = `
        <h2 contenteditable="true">${data.personalInfo.name}</h2>
        <p contenteditable="true">Email: ${data.personalInfo.email}</p>
        <p contenteditable="true">Phone: ${data.personalInfo.phone}</p>
        
        <h3>Education</h3>
        <p contenteditable="true">${data.education.degree}, ${data.education.school} (${data.education.graduationYear})</p>

        <h3>Skills</h3>
        <ul>
            ${data.skills.map(skill => `<li contenteditable="true">${skill}</li>`).join("")}
        </ul>

        <h3>Work Experience</h3>
        <p contenteditable="true">${data.workExperience.role} at ${data.workExperience.company}</p>
        <p contenteditable="true">Responsibilities: ${data.workExperience.responsibilities}</p>
    `;
}

// PDF Generation function using html2pdf
function downloadResumeAsPDF() {
    const element = document.getElementById("resumePreview")!;
    const options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
}

// Shareable link generation
function generateShareableLink() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const baseURL = window.location.origin;
    const shareableURL = `${baseURL}/resume/${encodeURIComponent(username)}`;
    alert(`Shareable Link: ${shareableURL}`);
}

// Event listeners
document.getElementById("generateResumeBtn")?.addEventListener("click", generateResume);
document.getElementById("downloadPdfBtn")?.addEventListener("click", downloadResumeAsPDF);
document.getElementById("shareLinkBtn")?.addEventListener("click", generateShareableLink);

