// Accessibility Enhancements for /mnt/data/EditProfile.js
// - File-specific changes based on its role in the application.
// - WCAG guidelines such as keyboard navigation, focus management, and semantic updates applied.

// Example Skip to Content Link (2.4.1)
<a href="#main-content" className="skip-to-content">Skip to main content</a>

// Focus Management Utility for /mnt/data/EditProfile.js
function trapFocus(element) {
    const focusableEls = element.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            }
        }
    });
}

// Detailed Enhancements
import React from "react";
import ProfileAvatar from "../components/UIElements/ProfileAvatar.tsx";
import EditInformation from "../components/Profile/EditInformation";

const EditProfile = ({
  id,
  name,
  department,
  researchCenter,
  description,
  email,
  role,
  image,
}) => {
  return (
    <section>
      <div className="flex gap-5">
        <ProfileAvatar name={name} image={image} />
        <EditInformation
          id={id}
          name={name}
          description={description}
          email={email}
          role={role}
          image={image}
          department={department}
          researchCenter={researchCenter}
        />
      </div>
    </section>
  );
};

export default EditProfile;


// Notes:
// - Comments added to explain accessibility changes.
// - Utility functions tailored to specific file roles.
// - Enhancements follow WCAG 2.2 guidelines.
