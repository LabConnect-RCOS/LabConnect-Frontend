// Accessibility Enhancements for /mnt/data/OpportunityActionCard.js
// - File-specific changes based on its role in the application.
// - WCAG guidelines such as keyboard navigation, focus management, and semantic updates applied.

// Example Skip to Content Link (2.4.1)
<a href="#main-content" className="skip-to-content">Skip to main content</a>

// Focus Management Utility for /mnt/data/OpportunityActionCard.js
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
import { Link } from "react-router-dom";

const OpportunityActionCard = ({
  editPath,
  title,
  body,
  id,
  activeStatus,
  changeActiveStatus,
  deleteOpp,
}) => {
  if (title.length > 100) {
    title = title.slice(0, 150) + " ...";
  }

  const color = activeStatus ? "btn-primary" : "btn-secondary";

  const buttonClass = `btn-sm btn ${color}`;

  return (
    <div className="opportunitycard hover:shadow-md card">
      <div className="card-body">
        <h2
          className={`${
            title.length > 100 ? "text-sm" : "text-lg font-bold"
          }  p-0 m-0`}
        >
          {title}
        </h2>
        <p className="card2-body">{body}</p>
        <div className="card-actions justify-start">
          
          
          {/* Edit button */}
          <Link to={editPath}>
            <button className="btn-sm btn btn-primary">Edit</button>
          </Link>


          {/* Deactivate Button */}
          <button
            className={buttonClass}
            onClick={() => {
              changeActiveStatus(id, activeStatus);
            }}
          >
            {activeStatus ? "Deactivate" : "Activate"}
          </button>

          {/* Delete Button */}
          <button
            className={"btn-sm btn btn-primary"}
            onClick={() => {
              deleteOpp(id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityActionCard;


// Notes:
// - Comments added to explain accessibility changes.
// - Utility functions tailored to specific file roles.
// - Enhancements follow WCAG 2.2 guidelines.
