/**
 * Calculate a balance score (0-100) based on role diversity and skill coverage within a crew.
 * 
 * @param {Array} crewMembers - Array of populated Recruit objects.
 * @returns {Number} A score from 0 to 100.
 */
export const calculateBalanceScore = (crewMembers) => {
  if (!crewMembers || crewMembers.length === 0) return 0;

  // Maximum unique roles considered ideal (6 is the total number of distinct roles in the system)
  const MAX_ROLES = 6;
  const uniqueRoles = new Set(crewMembers.map(m => m.roleKey)).size;
  
  // Maximum unique skills considered ideal for a standard crew
  const IDEAL_SKILL_COUNT = Math.min(10, crewMembers.length * 2);
  
  const allSkills = crewMembers.reduce((acc, curr) => acc.concat(curr.skills || []), []);
  const uniqueSkills = new Set(allSkills).size;

  // Weight: 60% for Role Diversity, 40% for Skill Diversity
  const roleScore = Math.min((uniqueRoles / MAX_ROLES) * 60, 60);
  
  let skillScore = 0;
  if (IDEAL_SKILL_COUNT > 0) {
    skillScore = Math.min((uniqueSkills / IDEAL_SKILL_COUNT) * 40, 40);
  }

  return Math.floor(roleScore + skillScore);
};

/**
 * Calculate compatibility score (0-100) between a crew and a challenge.
 * Evaluates overlap between the crew's roles/skills and the challenge's required roles/skills.
 * 
 * @param {Array} crewMembers - Array of populated Recruit objects.
 * @param {Object} challenge - The Challenge object.
 * @returns {Number} A score from 0 to 100.
 */
export const calculateCompatibilityScore = (crewMembers, challenge) => {
  if (!crewMembers || crewMembers.length === 0 || !challenge) return 0;

  const crewRoles = new Set(crewMembers.map(m => m.role.toLowerCase()));
  const allCrewSkills = new Set(
    crewMembers.reduce((acc, curr) => acc.concat((curr.skills || []).map(s => s.toLowerCase())), [])
  );

  const reqRoles = challenge.requiredRoles || [];
  const reqSkills = challenge.requiredSkills || [];

  let rolePoints = 0;
  let skillPoints = 0;

  // Evaluate Roles (50% weight)
  if (reqRoles.length === 0) {
    rolePoints = 50; // Free points if no specific roles required
  } else {
    let matchedRoles = 0;
    reqRoles.forEach(r => {
      if (crewRoles.has(r.toLowerCase())) matchedRoles++;
    });
    rolePoints = (matchedRoles / reqRoles.length) * 50;
  }

  // Evaluate Skills (50% weight)
  if (reqSkills.length === 0) {
    skillPoints = 50; // Free points if no specific skills required
  } else {
    let matchedSkills = 0;
    reqSkills.forEach(s => {
      if (allCrewSkills.has(s.toLowerCase())) matchedSkills++;
    });
    skillPoints = (matchedSkills / reqSkills.length) * 50;
  }

  return Math.floor(rolePoints + skillPoints);
};
