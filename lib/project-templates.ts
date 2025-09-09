export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  estimatedDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  sections: {
    id: string;
    title: string;
    description: string;
    required: boolean;
  }[];
  sample?: {
    title: string;
    abstract: string;
  };
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'web-app',
    name: 'Web Application',
    description: 'A full-stack web application with modern technologies',
    category: 'Software Development',
    icon: '🌐',
    estimatedDuration: '8-12 weeks',
    difficulty: 'Intermediate',
    tags: ['React', 'Node.js', 'Database', 'API'],
    sections: [
      {
        id: 'requirements',
        title: 'Requirements Analysis',
        description: 'Define functional and non-functional requirements',
        required: true
      },
      {
        id: 'design',
        title: 'System Design',
        description: 'Architecture, database design, and UI/UX mockups',
        required: true
      },
      {
        id: 'implementation',
        title: 'Implementation',
        description: 'Frontend, backend, and database implementation',
        required: true
      },
      {
        id: 'testing',
        title: 'Testing',
        description: 'Unit testing, integration testing, and user testing',
        required: true
      },
      {
        id: 'deployment',
        title: 'Deployment',
        description: 'Production deployment and documentation',
        required: true
      }
    ],
    sample: {
      title: 'E-Learning Platform',
      abstract: 'A comprehensive e-learning platform that allows students to enroll in courses, access learning materials, take quizzes, and track their progress. The system includes features for instructors to create courses, manage content, and monitor student performance.'
    }
  },
  {
    id: 'mobile-app',
    name: 'Mobile Application',
    description: 'Cross-platform mobile app for iOS and Android',
    category: 'Software Development',
    icon: '📱',
    estimatedDuration: '10-16 weeks',
    difficulty: 'Advanced',
    tags: ['React Native', 'Flutter', 'Firebase', 'API Integration'],
    sections: [
      {
        id: 'market-research',
        title: 'Market Research',
        description: 'Target audience analysis and competitor research',
        required: true
      },
      {
        id: 'ui-ux',
        title: 'UI/UX Design',
        description: 'User interface and experience design',
        required: true
      },
      {
        id: 'development',
        title: 'App Development',
        description: 'Cross-platform mobile app development',
        required: true
      },
      {
        id: 'testing',
        title: 'Testing & QA',
        description: 'Device testing, performance optimization',
        required: true
      },
      {
        id: 'store-deployment',
        title: 'App Store Deployment',
        description: 'Publishing to App Store and Google Play',
        required: false
      }
    ],
    sample: {
      title: 'Task Management Mobile App',
      abstract: 'A mobile application designed to help users organize and track their daily tasks. Features include task creation, priority setting, deadline reminders, progress tracking, and team collaboration capabilities.'
    }
  },
  {
    id: 'data-science',
    name: 'Data Science Project',
    description: 'Data analysis and machine learning project',
    category: 'Data Science',
    icon: '📊',
    estimatedDuration: '6-10 weeks',
    difficulty: 'Intermediate',
    tags: ['Python', 'Machine Learning', 'Data Analysis', 'Visualization'],
    sections: [
      {
        id: 'data-collection',
        title: 'Data Collection',
        description: 'Gather and validate data sources',
        required: true
      },
      {
        id: 'eda',
        title: 'Exploratory Data Analysis',
        description: 'Statistical analysis and data visualization',
        required: true
      },
      {
        id: 'modeling',
        title: 'Model Development',
        description: 'Machine learning model training and validation',
        required: true
      },
      {
        id: 'evaluation',
        title: 'Model Evaluation',
        description: 'Performance metrics and model comparison',
        required: true
      },
      {
        id: 'deployment',
        title: 'Model Deployment',
        description: 'Deploy model for production use',
        required: false
      }
    ],
    sample: {
      title: 'Student Performance Prediction System',
      abstract: 'A machine learning project that analyzes student academic data to predict performance and identify at-risk students. Uses various algorithms to provide insights for educational interventions.'
    }
  },
  {
    id: 'iot-project',
    name: 'IoT System',
    description: 'Internet of Things project with hardware and software components',
    category: 'Hardware',
    icon: '🔌',
    estimatedDuration: '12-16 weeks',
    difficulty: 'Advanced',
    tags: ['Arduino', 'Sensors', 'Cloud', 'Real-time Data'],
    sections: [
      {
        id: 'hardware-design',
        title: 'Hardware Design',
        description: 'Circuit design and component selection',
        required: true
      },
      {
        id: 'firmware',
        title: 'Firmware Development',
        description: 'Embedded software programming',
        required: true
      },
      {
        id: 'cloud-integration',
        title: 'Cloud Integration',
        description: 'Data collection and cloud connectivity',
        required: true
      },
      {
        id: 'dashboard',
        title: 'Dashboard Development',
        description: 'Real-time monitoring interface',
        required: true
      },
      {
        id: 'testing',
        title: 'System Testing',
        description: 'End-to-end system validation',
        required: true
      }
    ],
    sample: {
      title: 'Smart Home Energy Monitoring System',
      abstract: 'An IoT-based system that monitors energy consumption in real-time, provides insights on usage patterns, and suggests optimization strategies to reduce electricity costs.'
    }
  },
  {
    id: 'research-paper',
    name: 'Research Paper',
    description: 'Academic research project with literature review and analysis',
    category: 'Research',
    icon: '📚',
    estimatedDuration: '8-12 weeks',
    difficulty: 'Intermediate',
    tags: ['Literature Review', 'Analysis', 'Writing', 'Citations'],
    sections: [
      {
        id: 'literature-review',
        title: 'Literature Review',
        description: 'Comprehensive review of existing research',
        required: true
      },
      {
        id: 'methodology',
        title: 'Research Methodology',
        description: 'Research approach and methods',
        required: true
      },
      {
        id: 'data-collection',
        title: 'Data Collection',
        description: 'Gather research data and evidence',
        required: true
      },
      {
        id: 'analysis',
        title: 'Analysis & Results',
        description: 'Data analysis and findings presentation',
        required: true
      },
      {
        id: 'conclusion',
        title: 'Conclusion & Discussion',
        description: 'Summary and future research directions',
        required: true
      }
    ],
    sample: {
      title: 'Impact of AI on Modern Education Systems',
      abstract: 'This research investigates how artificial intelligence technologies are transforming educational practices, examining benefits, challenges, and future implications for learning outcomes.'
    }
  },
  {
    id: 'business-plan',
    name: 'Business Plan',
    description: 'Comprehensive business plan for a startup or new venture',
    category: 'Business',
    icon: '💼',
    estimatedDuration: '6-8 weeks',
    difficulty: 'Beginner',
    tags: ['Market Analysis', 'Financial Planning', 'Strategy', 'Presentation'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        description: 'Overview of the business concept and key points',
        required: true
      },
      {
        id: 'market-analysis',
        title: 'Market Analysis',
        description: 'Target market and competitive landscape',
        required: true
      },
      {
        id: 'business-model',
        title: 'Business Model',
        description: 'Revenue streams and value proposition',
        required: true
      },
      {
        id: 'financial-projections',
        title: 'Financial Projections',
        description: 'Budget, revenue forecasts, and funding needs',
        required: true
      },
      {
        id: 'implementation-plan',
        title: 'Implementation Plan',
        description: 'Timeline and milestones for execution',
        required: true
      }
    ],
    sample: {
      title: 'EcoFriendly Food Delivery Service',
      abstract: 'A sustainable food delivery platform that connects local restaurants with environmentally conscious consumers, using electric vehicles and biodegradable packaging.'
    }
  }
];

export const getTemplateById = (id: string): ProjectTemplate | undefined => {
  return projectTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): ProjectTemplate[] => {
  return projectTemplates.filter(template => template.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(projectTemplates.map(template => template.category)));
};