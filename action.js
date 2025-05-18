// Function to handle sign up
async function handleSignUp(event) {
    event.preventDefault();
    const formData = {
        username: document.querySelector('input[name="username"]').value,
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
    };

    // Send data to the server (you'll need a backend to handle this)
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (data.success) {
        alert('Account created!');
        closeModal();
    } else {
        alert(data.error || 'Signup failed');
    }
};

window.onload = function() {
    document.getElementById('signup').style.display = 'block';
};

// API function to fetch data from the server
document.getElementById('ipForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const ip = document.getElementById('ip').value;
    const resultsDiv = document.getElementById('ipResults');
    resultsDiv.textContent = 'Loading...';
    try {
        const response = await fetch(`http://api.ipstack.com/${ip}?access_key=86beff74e39f477a112807eb43eb1b07`);
        const data = await response.json();
        if (data && !data.error) {
            resultsDiv.innerHTML = `
                <p><strong>IP:</strong> ${data.ip}</p>
                <p><strong>Country:</strong> ${data.country_name}</p>
                <p><strong>Region:</strong> ${data.region_name}</p>
                <p><strong>City:</strong> ${data.city}</p>
                <p><strong>ISP:</strong> ${data.connection && data.connection.isp ? data.connection.isp : 'N/A'}</p>
            `;
        } else {
            resultsDiv.textContent = 'Invalid IP or not found.';
        }
    } catch (error) {
        resultsDiv.textContent = 'Error fetching data.';
    }
});

// Function to close the sign-up modal
function closeModal() {
    document.getElementById('signup').style.display = 'none';
}



