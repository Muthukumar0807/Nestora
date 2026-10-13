import {
  INITIAL_USER_PREFERENCES,
  INITIAL_USER_PROFILE,
  SAMPLE_SEED_PROJECTS,
  INSPIRATIONS_DATA,
  DESIGN_CHALLENGES,
} from '../data/mockData';
import {
  CustomizedDesign,
  DesignChallenge,
  FamilyVote,
  InspirationItem,
  ProjectNest,
  UserProfile,
  UserPreferences,
} from '../types';

const STORAGE_KEYS = {
  PROJECTS: 'nestora_projects_v1',
  ACTIVE_PROJECT_ID: 'nestora_active_project_id_v1',
  USER_PREFERENCES: 'nestora_user_preferences_v1',
  USER_PROFILE: 'nestora_user_profile_v1',
  CHALLENGES: 'nestora_challenges_v1',
  FAVORITE_INSPIRATIONS: 'nestora_fav_inspirations_v1',
};

export const StorageService = {
  getProjects(): ProjectNest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        // Seed with sample projects
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(SAMPLE_SEED_PROJECTS));
        return SAMPLE_SEED_PROJECTS;
      }
      return JSON.parse(data);
    } catch {
      return SAMPLE_SEED_PROJECTS;
    }
  },

  saveProjects(projects: ProjectNest[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  },

  getProjectById(id: string): ProjectNest | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.id === id);
  },

  saveProject(project: ProjectNest): void {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      projects[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      projects.unshift({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.saveProjects(projects);
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter((p) => p.id !== id);
    this.saveProjects(projects);
  },

  getActiveProjectId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
    } catch {
      return null;
    }
  },

  setActiveProjectId(id: string | null): void {
    try {
      if (id) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_ID, id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
      }
    } catch (e) {
      console.error('Failed to set active project id', e);
    }
  },

  getUserPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return data ? JSON.parse(data) : INITIAL_USER_PREFERENCES;
    } catch {
      return INITIAL_USER_PREFERENCES;
    }
  },

  saveUserPreferences(prefs: UserPreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.error('Failed to save preferences', e);
    }
  },

  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  getChallenges(): DesignChallenge[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
      return data ? JSON.parse(data) : DESIGN_CHALLENGES;
    } catch {
      return DESIGN_CHALLENGES;
    }
  },

  completeChallenge(id: string): { challenge: DesignChallenge; updatedProfile: UserProfile } | null {
    const challenges = this.getChallenges();
    const target = challenges.find((c) => c.id === id);
    if (!target) return null;

    target.isCompleted = true;
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
    } catch (e) {
      console.error('Failed to update challenge status', e);
    }

    // Add badge and XP to user profile
    const profile = this.getUserProfile();
    const hasBadge = profile.badges.some((b: any) =>
      typeof b === 'string' ? b === target.rewardBadge : b.name === target.rewardBadge
    );

    if (!hasBadge) {
      profile.badges.push({
        id: `badge_${target.id}`,
        name: target.rewardBadge,
        icon: '🏆',
        description: `Mastered the ${target.title} challenge.`,
      });
    }

    profile.xp = (profile.xp || 150) + target.xpReward;
    profile.weaverRank =
      profile.xp > 500 ? 'Master Weaver' : profile.xp > 250 ? 'Weaver' : 'Builder';

    this.saveUserProfile(profile);
    return { challenge: target, updatedProfile: profile };
  },

  addFamilyVote(projectId: string, vote: FamilyVote): void {
    const project = this.getProjectById(projectId);
    if (project) {
      const votes = project.familyVotes || [];
      votes.push(vote);
      project.familyVotes = votes;
      this.saveProject(project);
    }
  },

  resetAllData(): void {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(SAMPLE_SEED_PROJECTS));
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(INITIAL_USER_PREFERENCES));
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(INITIAL_USER_PROFILE));
  },
};
