
  // Initialize Particles.js for background effect
  particlesJS("particles-js", {
    particles: {
      number: { value: 80 },
      size: { value: 4 },
      color: { value: "#00ffd5" },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00ffd5",
        opacity: 0.6
      }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "repulse" } }
    }
  });
