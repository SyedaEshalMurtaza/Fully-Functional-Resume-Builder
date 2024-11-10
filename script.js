document.getElementById('generateResumeBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const degree = document.getElementById('degree').value;
    const school = document.getElementById('school').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const skills = document.getElementById('skills').value;
    const company = document.getElementById('company').value;
    const role = document.getElementById('role').value;
    const responsibilities = document.getElementById('responsibilities').value;

    const resumeContent = `
        <h2>${name}</h2>
        <p>${email} | ${phone}</p>
        <h3>Education</h3>
        <p>${degree}, ${school} (${graduationYear})</p>
        <h3>Skills</h3>
        <p>${skills}</p>
        <h3>Work Experience</h3>
        <p><strong>${role}</strong> at ${company}</p>
        <p>${responsibilities}</p>
    `;

    document.getElementById('resumePreview').innerHTML = resumeContent;
});

// Download PDF
document.getElementById('downloadPdfBtn').addEventListener('click', () => {
    const element = document.getElementById('resumePreview');
    html2pdf()
        .from(element)
        .set({
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        })
        .save();
});
