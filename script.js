document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const searchButton = document.querySelector("button");

    // Set default username
    const defaultUsername = "Arijit-017";

    // Fetch default GitHub profile on page load
    fetchGitHubProfile(defaultUsername);

    searchButton.addEventListener("click", () => {
        const username = searchInput.value.trim();
        if (username) {
            fetchGitHubProfile(username);
        }
    });

    async function fetchGitHubProfile(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error("User not found");
            }
            const data = await response.json();
            updateProfile(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function updateProfile(data) {
        document.getElementById("avatar").src = data.avatar_url;
        document.getElementById("name").textContent = data.name || "Not Available";
        document.getElementById("username").textContent = data.login;
        document.getElementById("profile-link").href = data.html_url;
        document.getElementById("profile-link").textContent = data.html_url;
        document.getElementById("bio").textContent = data.bio || "Not Available";
        document.getElementById("public-repo").textContent = data.public_repos;
        document.getElementById("public-gists").textContent = data.public_gists;
        document.getElementById("followers").textContent = data.followers;
        document.getElementById("following").textContent = data.following;
        document.getElementById("date").textContent = new Date(data.created_at).toDateString();
    }
});
