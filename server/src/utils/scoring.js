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

  // 1. Team Size Check (Strict requirement - returns 0 if they don't have enough members)
  const teamSize = crewMembers.length;
  if (challenge.minTeamSize && teamSize < challenge.minTeamSize) {
    return 0; // Not eligible
  }
  
  const crewRoles = new Set(crewMembers.map(m => m.role.toLowerCase()));
  const allCrewSkills = new Set(
    crewMembers.reduce((acc, curr) => acc.concat((curr.skills || []).map(s => s.toLowerCase())), [])
  );
  const allCrewInterests = new Set(
    crewMembers.reduce((acc, curr) => acc.concat((curr.interests || []).map(i => i.toLowerCase())), [])
  );

  const reqRoles = challenge.requiredRoles || [];
  const reqSkills = challenge.requiredSkills || [];
  const tags = challenge.tags || [];

  let rolePoints = 0;
  let skillPoints = 0;
  let interestPoints = 0;

  // Evaluate Skills (50% weight) - Strict validation
  if (reqSkills.length === 0) {
    skillPoints = 50; 
  } else {
    let matchedSkills = 0;
    reqSkills.forEach(s => {
      if (allCrewSkills.has(s.toLowerCase())) matchedSkills++;
    });
    // For strictness, if 0 skills match when they are required, the score shouldn't just be low, it should heavily penalize.
    // We'll keep it proportional but weight it highly (50 out of 100).
    skillPoints = (matchedSkills / reqSkills.length) * 50;
  }

  // Evaluate Roles (30% weight)
  if (reqRoles.length === 0) {
    rolePoints = 30; 
  } else {
    let matchedRoles = 0;
    reqRoles.forEach(r => {
      if (crewRoles.has(r.toLowerCase())) matchedRoles++;
    });
    rolePoints = (matchedRoles / reqRoles.length) * 30;
  }

  // Evaluate Interests/Tags (20% weight)
  if (tags.length === 0) {
    interestPoints = 20;
  } else {
    let matchedTags = 0;
    tags.forEach(t => {
      if (allCrewInterests.has(t.toLowerCase())) matchedTags++;
    });
    interestPoints = (matchedTags / tags.length) * 20;
  }

  return Math.floor(skillPoints + rolePoints + interestPoints);
};
