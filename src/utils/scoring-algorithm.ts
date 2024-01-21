type Github = {
  id: string;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: string;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: string;
  stargazers_count: number;
  watchers_count: string;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: string;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: boolean;
  is_template: boolean;
  topics: string[];
  visibility: string;
  forks: string;
  open_issues: string;
  watchers: string;
  default_branch: string;
  permissions: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
  };
  score: string;
};

type Project = {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  type: string | null;
  projectUrl: string | null;
  tags: string | null;
  ownerId: string;
  createdAt: Date | null;
  likes: any[];
};

function calculateGitHubProjectScore(
  stars: number,
  forks: number,
  tags: string[],
  language: string,
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    interests: string;
    skills: string;
    rating: number;
  },
) {
  const maxLikes = 1000; // Define a maximum value for stars/likes for normalization
  const maxForks = 500; // Define a maximum value for forks for normalization
  const maxTopics = 5; // Define a maximum value for the number of topics

  // Assign weights to each parameter
  const likesWeight = 0.2;
  const forksWeight = 0.15;
  const topicsWeight = 0.15;
  const languageWeight = 0.1;
  const interestsWeight = 0.2;
  const skillsWeight = 0.15;
  const ratingWeight = 0.05;

  // Normalize values
  const normalizedLikes = Math.min(stars / maxLikes, 1);
  const normalizedForks = Math.min(forks / maxForks, 1);
  const normalizedTopics = Math.min(tags.length / maxTopics, 1);

  // Assign scores based on weights and normalized values
  const likesScore = normalizedLikes * likesWeight;
  const forksScore = normalizedForks * forksWeight;
  const topicsScore = normalizedTopics * topicsWeight;

  // Language score is binary (either 0 or languageWeight)
  const languageScore = language ? languageWeight : 0;

  // Interests score based on the intersection of project topics and user interests
  const projectInterests = tags;
  const userInterests = user.interests.split(",");
  const interestsIntersection = projectInterests.filter((interest) =>
    userInterests.includes(interest),
  );
  const interestsScore =
    (interestsIntersection.length ?? 0 / projectInterests.length) * interestsWeight;

  // Skills score based on the intersection of project language and user skills
  const projectLanguage = language;
  const userSkills = user.skills.split(",");
  const skillsIntersection = userSkills.includes(projectLanguage) ? 1 : 0;
  const skillsScore = skillsIntersection * skillsWeight;

  // Rating score
  const normalizedRating = Math.min(user.rating / 5, 1); // Assuming rating is on a scale of 1 to 5
  const ratingScore = normalizedRating * ratingWeight;

  // Calculate total score out of 100
  const totalScore =
    (likesScore +
      forksScore +
      topicsScore +
      languageScore +
      interestsScore +
      skillsScore +
      ratingScore) *
    100;

  return parseInt(totalScore.toFixed(2));
}

function calculateProjectScore(project: any, user : any) {
  const maxLikes = 100; // Define a maximum value for project likes for normalization

  // Assign weights to each parameter
  const likesWeight = 0.3;
  const interestsWeight = 0.2;
  const skillsWeight = 0.2;
  const ratingWeight = 0.1;
  const createdAtWeight = 0.1;
  const typeWeight = 0.1;

  // Normalize values
  const normalizedLikes = Math.min(project.likes.length / maxLikes, 1);

  // Assign scores based on weights and normalized values
  const likesScore = normalizedLikes * likesWeight;

  // Interests score based on the intersection of project tags and user interests
  const projectTags = project.tags ? project.tags.split(',') : [];
  const userInterests = user.interests.split(',');
  const interestsIntersection = projectTags.filter((tag: any) => userInterests.includes(tag));
  const interestsScore = (interestsIntersection.length / projectTags.length) * interestsWeight;

  // Skills score based on the intersection of project type and user skills
  const projectType = project.type || '';
  const userSkills = user.skills.split(',');
  const skillsIntersection = userSkills.includes(projectType) ? 1 : 0;
  const skillsScore = skillsIntersection * skillsWeight;

  // Rating score
  const normalizedRating = Math.min(user.rating / 5, 1); // Assuming rating is on a scale of 1 to 5
  const ratingScore = normalizedRating * ratingWeight;

  // Created At score based on the project creation date
  //
  const createdAtScore = project.createdAt
      ? (new Date().getTime() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24) * createdAtWeight
      : 0;

  // Type score is binary (either 0 or typeWeight)
  const typeScore = projectType ? typeWeight : 0;

  // Calculate total score out of 100
  return (
    (likesScore +
      interestsScore +
      skillsScore +
      ratingScore +
      createdAtScore +
      typeScore) *
    100
  );
}

export const ScoringAlgorithm = (
  project: Project | Github,
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    interests: string;
    skills: string;
    rating: number;
  },
) => {
  if (!user || !user.id) {
    return 0;
  }

  const isGithubProject = (project as Github).owner !== undefined;

  if (isGithubProject) {
    const githubProject = project as Github;
    const tags = githubProject.topics;
    const numberOfLikes = githubProject.stargazers_count;
    const numberOfForks = githubProject.forks_count;
    const language = githubProject.language;

    return calculateGitHubProjectScore(
      numberOfLikes,
      numberOfForks,
      tags,
      language,
      user,
    );
  }

    return parseInt(calculateProjectScore(project, user).toFixed(2));
};
