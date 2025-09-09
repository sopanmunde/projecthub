export interface ProjectStatus {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  assignee?: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  progress: number;
  priority: 'Low' | 'Medium' | 'High';
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isPublic: boolean;
  templateId?: string;
  tasks: ProjectTask[];
  team: string[];
  owner: string;
}

export interface ProjectActivity {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  action: 'created' | 'updated' | 'commented' | 'completed_task' | 'status_changed';
  description: string;
  timestamp: Date;
  metadata?: any;
}

// Sample project statuses
export const projectStatuses: ProjectStatus[] = [
  {
    id: 'planning',
    name: 'Planning',
    color: '#6366f1',
    description: 'Project is in planning phase'
  },
  {
    id: 'in-progress',
    name: 'In Progress',
    color: '#eab308',
    description: 'Project is actively being worked on'
  },
  {
    id: 'review',
    name: 'Review',
    color: '#f59e0b',
    description: 'Project is under review'
  },
  {
    id: 'completed',
    name: 'Completed',
    color: '#10b981',
    description: 'Project has been completed'
  },
  {
    id: 'on-hold',
    name: 'On Hold',
    color: '#6b7280',
    description: 'Project is temporarily on hold'
  },
  {
    id: 'cancelled',
    name: 'Cancelled',
    color: '#ef4444',
    description: 'Project has been cancelled'
  }
];

// Sample projects data
export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Learning Platform',
    description: 'A comprehensive e-learning platform with course management, student tracking, and assessment tools.',
    category: 'Software Development',
    status: 'in-progress',
    progress: 65,
    priority: 'High',
    deadline: new Date('2024-12-15'),
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-09'),
    tags: ['React', 'Node.js', 'MongoDB', 'Education'],
    isPublic: true,
    templateId: 'web-app',
    team: ['john@example.com', 'sarah@example.com'],
    owner: 'john@example.com',
    tasks: [
      {
        id: 't1',
        title: 'User Authentication System',
        description: 'Implement secure user login and registration',
        completed: true,
        dueDate: new Date('2024-09-15'),
        assignee: 'john@example.com',
        priority: 'High'
      },
      {
        id: 't2',
        title: 'Course Management Interface',
        description: 'Build interface for creating and managing courses',
        completed: true,
        dueDate: new Date('2024-10-01'),
        assignee: 'sarah@example.com',
        priority: 'Medium'
      },
      {
        id: 't3',
        title: 'Student Dashboard',
        description: 'Create dashboard for students to track progress',
        completed: false,
        dueDate: new Date('2024-10-15'),
        assignee: 'john@example.com',
        priority: 'High'
      }
    ]
  },
  {
    id: '2',
    title: 'Smart Home Energy Monitor',
    description: 'IoT system to monitor and optimize home energy consumption using sensors and data analytics.',
    category: 'Hardware',
    status: 'planning',
    progress: 25,
    priority: 'Medium',
    deadline: new Date('2025-01-30'),
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-09-08'),
    tags: ['IoT', 'Arduino', 'Python', 'Data Analytics'],
    isPublic: false,
    templateId: 'iot-project',
    team: ['mike@example.com'],
    owner: 'mike@example.com',
    tasks: [
      {
        id: 't4',
        title: 'Hardware Component Research',
        description: 'Research and select appropriate sensors and microcontrollers',
        completed: true,
        dueDate: new Date('2024-09-10'),
        assignee: 'mike@example.com',
        priority: 'High'
      },
      {
        id: 't5',
        title: 'Circuit Design',
        description: 'Design the circuit layout and connections',
        completed: false,
        dueDate: new Date('2024-09-25'),
        assignee: 'mike@example.com',
        priority: 'Medium'
      }
    ]
  },
  {
    id: '3',
    title: 'Customer Behavior Analysis',
    description: 'Machine learning project to analyze customer purchasing patterns and predict future trends.',
    category: 'Data Science',
    status: 'review',
    progress: 85,
    priority: 'Medium',
    deadline: new Date('2024-11-20'),
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-09-09'),
    tags: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn'],
    isPublic: true,
    templateId: 'data-science',
    team: ['anna@example.com', 'david@example.com'],
    owner: 'anna@example.com',
    tasks: [
      {
        id: 't6',
        title: 'Data Collection and Cleaning',
        description: 'Gather and preprocess customer data',
        completed: true,
        dueDate: new Date('2024-08-15'),
        assignee: 'anna@example.com',
        priority: 'High'
      },
      {
        id: 't7',
        title: 'Feature Engineering',
        description: 'Create meaningful features from raw data',
        completed: true,
        dueDate: new Date('2024-09-01'),
        assignee: 'david@example.com',
        priority: 'Medium'
      },
      {
        id: 't8',
        title: 'Model Training and Validation',
        description: 'Train ML models and validate performance',
        completed: false,
        dueDate: new Date('2024-09-20'),
        assignee: 'anna@example.com',
        priority: 'High'
      }
    ]
  },
  {
    id: '4',
    title: 'Sustainable Food Delivery App',
    description: 'Mobile application connecting eco-conscious consumers with local sustainable restaurants.',
    category: 'Software Development',
    status: 'completed',
    progress: 100,
    priority: 'Low',
    deadline: new Date('2024-08-31'),
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-08-31'),
    tags: ['React Native', 'Firebase', 'Maps API', 'Sustainability'],
    isPublic: true,
    templateId: 'mobile-app',
    team: ['emma@example.com', 'carlos@example.com'],
    owner: 'emma@example.com',
    tasks: [
      {
        id: 't9',
        title: 'App Store Deployment',
        description: 'Deploy app to iOS and Android stores',
        completed: true,
        dueDate: new Date('2024-08-30'),
        assignee: 'carlos@example.com',
        priority: 'High'
      }
    ]
  }
];

// Sample activity data
export const sampleActivities: ProjectActivity[] = [
  {
    id: 'a1',
    projectId: '1',
    userId: 'john@example.com',
    userName: 'John Smith',
    action: 'completed_task',
    description: 'Completed task: User Authentication System',
    timestamp: new Date('2024-09-09T10:30:00'),
    metadata: { taskId: 't1' }
  },
  {
    id: 'a2',
    projectId: '1',
    userId: 'sarah@example.com',
    userName: 'Sarah Johnson',
    action: 'updated',
    description: 'Updated project description and added new requirements',
    timestamp: new Date('2024-09-09T09:15:00')
  },
  {
    id: 'a3',
    projectId: '2',
    userId: 'mike@example.com',
    userName: 'Mike Chen',
    action: 'status_changed',
    description: 'Changed status from "Planning" to "In Progress"',
    timestamp: new Date('2024-09-08T14:20:00'),
    metadata: { oldStatus: 'planning', newStatus: 'in-progress' }
  },
  {
    id: 'a4',
    projectId: '3',
    userId: 'anna@example.com',
    userName: 'Anna Davis',
    action: 'completed_task',
    description: 'Completed task: Feature Engineering',
    timestamp: new Date('2024-09-08T11:45:00'),
    metadata: { taskId: 't7' }
  },
  {
    id: 'a5',
    projectId: '1',
    userId: 'john@example.com',
    userName: 'John Smith',
    action: 'created',
    description: 'Created new project: E-Learning Platform',
    timestamp: new Date('2024-09-01T09:00:00')
  }
];

// Utility functions
export const getProjectById = (id: string): Project | undefined => {
  return sampleProjects.find(project => project.id === id);
};

export const getProjectsByStatus = (status: string): Project[] => {
  return sampleProjects.filter(project => project.status === status);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return sampleProjects.filter(project => project.category === category);
};

export const getActivitiesByProject = (projectId: string): ProjectActivity[] => {
  return sampleActivities.filter(activity => activity.projectId === projectId);
};

export const getRecentActivities = (limit: number = 10): ProjectActivity[] => {
  return sampleActivities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
};

export const getStatusById = (statusId: string): ProjectStatus | undefined => {
  return projectStatuses.find(status => status.id === statusId);
};

export const calculateOverallProgress = (): number => {
  const totalProjects = sampleProjects.length;
  const totalProgress = sampleProjects.reduce((sum, project) => sum + project.progress, 0);
  return Math.round(totalProgress / totalProjects);
};

export const getProjectStats = () => {
  const total = sampleProjects.length;
  const completed = sampleProjects.filter(p => p.status === 'completed').length;
  const inProgress = sampleProjects.filter(p => p.status === 'in-progress').length;
  const planning = sampleProjects.filter(p => p.status === 'planning').length;
  
  return {
    total,
    completed,
    inProgress,
    planning,
    completionRate: Math.round((completed / total) * 100)
  };
};