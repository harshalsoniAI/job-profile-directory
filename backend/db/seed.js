const { getDatabase } = require('./database');

const profiles = [
  {
    id: 'JP-PW-001', title: 'Civil Engineer', family: 'Engineering', category: 'Public Works',
    level: 'Individual Contributor', pay: 'Grade 14',
    desc: 'Designs, plans, and oversees construction and maintenance of public infrastructure including roads, bridges, water systems, and municipal buildings. Reviews engineering plans and specifications for compliance with city standards and applicable codes. Conducts site inspections, prepares cost estimates, and manages project timelines. Coordinates with contractors, other city departments, and regulatory agencies to ensure projects are completed safely, on budget, and within scope.',
    quals: 'Bachelor\'s degree in Civil Engineering or related field. Professional Engineer (PE) license preferred. Minimum 3 years of experience in civil engineering, preferably in a public sector or municipal environment. Proficiency in AutoCAD, GIS software, and project management tools. Strong analytical, communication, and problem-solving skills.',
    date: '2024-01-15'
  },
  {
    id: 'JP-PW-002', title: 'Maintenance Worker II', family: 'Trades & Maintenance', category: 'Public Works',
    level: 'Individual Contributor', pay: 'Grade 7',
    desc: 'Performs semi-skilled and skilled maintenance work on city facilities, streets, sidewalks, and utility systems. Operates light and heavy equipment including loaders, backhoes, and dump trucks. Assists with snow removal, pothole repair, and emergency response activities. May lead small crews of maintenance workers on assigned projects.',
    quals: 'High school diploma or GED. Minimum 2 years of experience in general maintenance, construction, or related trades. Valid Commercial Driver\'s License (CDL) Class B preferred. Ability to perform physical labor in various weather conditions. Knowledge of basic plumbing, electrical, and carpentry skills.',
    date: '2023-11-01'
  },
  {
    id: 'JP-PW-003', title: 'Public Works Director', family: 'Executive Leadership', category: 'Public Works',
    level: 'Executive', pay: 'Grade 22',
    desc: 'Provides executive leadership and strategic direction for all Public Works operations including streets, water, sewer, fleet, and facilities management. Develops and manages the department budget. Advises the City Manager and Council on infrastructure planning, capital improvement projects, and policy matters. Oversees compliance with environmental and safety regulations.',
    quals: 'Bachelor\'s degree in Civil Engineering, Public Administration, or related field; Master\'s degree preferred. Minimum 10 years of progressively responsible experience in public works or infrastructure management, including 5 years in a senior leadership role. PE license strongly preferred.',
    date: '2023-06-01'
  },
  {
    id: 'JP-PW-004', title: 'Water Treatment Plant Operator', family: 'Utilities Operations', category: 'Public Works',
    level: 'Individual Contributor', pay: 'Grade 10',
    desc: 'Operates and monitors water treatment processes to ensure safe, clean drinking water meets all state and federal standards. Performs chemical testing, adjusts treatment processes, and maintains detailed operational logs. Troubleshoots equipment malfunctions and performs preventive maintenance on pumps, valves, and control systems.',
    quals: 'High school diploma or GED plus completion of water treatment coursework. State Water Treatment Operator certification (Level II or higher). Minimum 2 years of experience in water or wastewater treatment operations. Ability to work rotating shifts including nights, weekends, and holidays.',
    date: '2024-03-01'
  },
  {
    id: 'JP-FIN-001', title: 'Budget Analyst', family: 'Financial Analysis', category: 'Finance',
    level: 'Individual Contributor', pay: 'Grade 13',
    desc: 'Analyzes budget proposals, monitors expenditures, and prepares financial reports for city departments. Assists in the preparation of the annual operating and capital budgets. Reviews purchase requests and contracts for budget compliance. Develops financial forecasts and conducts cost-benefit analyses to support decision-making.',
    quals: 'Bachelor\'s degree in Finance, Accounting, Public Administration, or related field. Minimum 2 years of budget analysis or financial planning experience, preferably in government. Proficiency in Excel, ERP systems, and financial reporting tools. Strong analytical and communication skills.',
    date: '2024-02-01'
  },
  {
    id: 'JP-FIN-002', title: 'Accountant II', family: 'Accounting', category: 'Finance',
    level: 'Individual Contributor', pay: 'Grade 12',
    desc: 'Performs professional accounting work including general ledger maintenance, account reconciliations, and financial statement preparation in accordance with GAAP and governmental accounting standards (GASB). Processes journal entries, assists with annual audit preparation, and prepares monthly and quarterly financial reports.',
    quals: 'Bachelor\'s degree in Accounting or Finance. CPA or CGFM certification preferred. Minimum 2 years of professional accounting experience. Knowledge of governmental accounting principles and fund accounting. Proficiency in ERP/financial systems.',
    date: '2023-09-15'
  },
  {
    id: 'JP-FIN-003', title: 'Finance Director', family: 'Executive Leadership', category: 'Finance',
    level: 'Executive', pay: 'Grade 23',
    desc: 'Directs all financial operations of the city including accounting, budgeting, treasury, purchasing, and revenue collection. Serves as the chief financial advisor to the City Manager and elected officials. Oversees the annual comprehensive financial report (ACFR), debt management, and investment portfolio. Ensures compliance with all applicable financial regulations and reporting requirements.',
    quals: 'Bachelor\'s degree in Accounting, Finance, or Public Administration; Master\'s degree or CPA required. Minimum 10 years of progressively responsible financial management experience, including 5 years in a senior leadership role in government finance.',
    date: '2023-01-15'
  },
  {
    id: 'JP-FIN-004', title: 'Payroll Specialist', family: 'Payroll & Benefits', category: 'Finance',
    level: 'Individual Contributor', pay: 'Grade 9',
    desc: 'Processes bi-weekly payroll for all city employees ensuring accuracy and compliance with federal, state, and local tax regulations. Maintains payroll records, processes garnishments, and handles employee payroll inquiries. Coordinates with HR on new hires, terminations, and benefit deductions.',
    quals: 'Associate\'s degree in Accounting, Business, or related field. Minimum 2 years of payroll processing experience. Knowledge of payroll tax regulations and FLSA. Experience with HRIS/payroll systems (e.g., Workday, ADP). FPC or CPP certification preferred.',
    date: '2024-01-01'
  },
  {
    id: 'JP-IT-001', title: 'Systems Administrator', family: 'Infrastructure & Operations', category: 'Information Technology',
    level: 'Individual Contributor', pay: 'Grade 14',
    desc: 'Manages and maintains the city\'s server infrastructure, network systems, and cloud environments. Implements security patches, monitors system performance, and ensures 99.9% uptime for critical municipal applications. Provides Tier 3 technical support and leads disaster recovery planning and testing.',
    quals: 'Bachelor\'s degree in Computer Science, Information Technology, or related field. Minimum 3 years of systems administration experience. Certifications such as CompTIA Server+, Microsoft MCSA, or AWS Solutions Architect preferred. Experience with Windows Server, Linux, VMware, and Azure/AWS.',
    date: '2024-04-01'
  },
  {
    id: 'JP-IT-002', title: 'GIS Analyst', family: 'Data & Analytics', category: 'Information Technology',
    level: 'Individual Contributor', pay: 'Grade 13',
    desc: 'Develops and maintains geographic information systems (GIS) databases and mapping applications for city departments. Creates spatial analyses, interactive maps, and data visualizations to support planning, public safety, and infrastructure management decisions. Provides technical GIS support and training to staff.',
    quals: 'Bachelor\'s degree in Geography, GIS, Computer Science, or related field. Minimum 2 years of GIS experience. Proficiency in ArcGIS Pro, ArcGIS Online, and Python scripting. GISP certification preferred. Experience with spatial databases and web mapping applications.',
    date: '2023-10-15'
  },
  {
    id: 'JP-IT-003', title: 'IT Director', family: 'Executive Leadership', category: 'Information Technology',
    level: 'Executive', pay: 'Grade 22',
    desc: 'Provides strategic leadership for all information technology services including infrastructure, applications, cybersecurity, GIS, and telecommunications. Develops the city\'s technology roadmap and digital transformation strategy. Manages the IT budget, vendor relationships, and technology procurement. Ensures data security, regulatory compliance, and business continuity.',
    quals: 'Bachelor\'s degree in Computer Science, Information Systems, or related field; Master\'s degree preferred. Minimum 10 years of IT experience including 5 years in IT leadership. CISSP, PMP, or ITIL certification preferred. Experience with government IT operations and compliance frameworks.',
    date: '2023-03-01'
  },
  {
    id: 'JP-IT-004', title: 'Help Desk Technician', family: 'End User Support', category: 'Information Technology',
    level: 'Individual Contributor', pay: 'Grade 8',
    desc: 'Provides Tier 1 and Tier 2 technical support to city employees via phone, email, and in-person. Troubleshoots hardware, software, and network issues. Sets up and configures workstations, printers, and mobile devices. Documents incidents and resolutions in the IT service management system.',
    quals: 'Associate\'s degree in IT or related field, or equivalent experience. CompTIA A+ certification preferred. Minimum 1 year of help desk or technical support experience. Strong customer service and communication skills. Knowledge of Windows, Microsoft 365, and common business applications.',
    date: '2024-05-01'
  },
  {
    id: 'JP-PR-001', title: 'Recreation Program Coordinator', family: 'Recreation Programs', category: 'Parks & Recreation',
    level: 'Individual Contributor', pay: 'Grade 11',
    desc: 'Plans, organizes, and oversees recreational programs and special events for the community including youth sports, senior activities, fitness classes, and cultural events. Coordinates facility scheduling, recruits and trains part-time staff and volunteers, and manages program budgets. Develops marketing materials and community outreach strategies.',
    quals: 'Bachelor\'s degree in Recreation Management, Sports Management, or related field. Minimum 2 years of experience in recreation programming. CPR/First Aid certification required. Strong organizational, leadership, and public relations skills. Experience with recreation management software.',
    date: '2024-02-15'
  },
  {
    id: 'JP-PR-002', title: 'Park Maintenance Supervisor', family: 'Grounds & Facilities', category: 'Parks & Recreation',
    level: 'Supervisor', pay: 'Grade 12',
    desc: 'Supervises maintenance crews responsible for the upkeep of city parks, trails, athletic fields, and recreational facilities. Plans and schedules maintenance activities including mowing, irrigation, tree care, playground inspections, and facility repairs. Manages seasonal staff and contractors. Ensures parks meet safety and accessibility standards.',
    quals: 'High school diploma or GED; Associate\'s degree in Horticulture or related field preferred. Minimum 4 years of parks or grounds maintenance experience, including 1 year of supervisory experience. Pesticide applicator license required. Knowledge of turf management, irrigation systems, and landscape design.',
    date: '2023-08-01'
  },
  {
    id: 'JP-PR-003', title: 'Parks & Recreation Director', family: 'Executive Leadership', category: 'Parks & Recreation',
    level: 'Executive', pay: 'Grade 21',
    desc: 'Provides overall leadership for the Parks & Recreation Department including parks, recreation programs, aquatics, senior services, and special events. Develops strategic plans for park system expansion and facility improvements. Manages department budget and seeks grant funding opportunities. Represents the department before City Council, community groups, and partner agencies.',
    quals: 'Bachelor\'s degree in Recreation Administration, Public Administration, or related field; Master\'s preferred. CPRP certification preferred. Minimum 8 years of progressively responsible parks and recreation experience, including 4 years in a leadership role.',
    date: '2023-05-01'
  },
  {
    id: 'JP-PR-004', title: 'Aquatics Manager', family: 'Recreation Programs', category: 'Parks & Recreation',
    level: 'Manager', pay: 'Grade 13',
    desc: 'Manages daily operations of the city\'s aquatic facilities including pools, splash pads, and water features. Oversees swim programs, water safety instruction, and lifeguard training. Develops operational schedules, manages seasonal staffing of 30+ lifeguards and instructors, and ensures compliance with health and safety regulations.',
    quals: 'Bachelor\'s degree in Recreation Management or related field. Lifeguard Instructor, Water Safety Instructor, and CPO certifications required. Minimum 3 years of aquatics management experience. Strong leadership and budget management skills.',
    date: '2024-04-15'
  },
  {
    id: 'JP-HR-001', title: 'HR Generalist', family: 'Human Resources', category: 'Human Resources',
    level: 'Individual Contributor', pay: 'Grade 12',
    desc: 'Provides comprehensive human resources support including recruitment, employee relations, benefits administration, and compliance. Manages full-cycle recruitment for assigned departments. Conducts new employee orientations and processes personnel actions. Advises managers on HR policies, performance management, and workplace issues.',
    quals: 'Bachelor\'s degree in Human Resources, Business Administration, or related field. PHR or SHRM-CP certification preferred. Minimum 3 years of HR generalist experience. Knowledge of employment law, FMLA, ADA, and EEO regulations. Experience with HRIS systems (Workday experience a plus).',
    date: '2024-01-01'
  },
  {
    id: 'JP-HR-002', title: 'Classification & Compensation Analyst', family: 'Compensation & Benefits', category: 'Human Resources',
    level: 'Individual Contributor', pay: 'Grade 14',
    desc: 'Conducts job classification studies, salary surveys, and compensation analyses to ensure equitable and competitive pay practices. Develops and maintains the city\'s classification plan and pay structure. Writes and updates job descriptions, evaluates positions using point-factor methodology, and provides recommendations on FLSA classifications.',
    quals: 'Bachelor\'s degree in Human Resources, Public Administration, or related field. CCP certification preferred. Minimum 3 years of classification and compensation experience, preferably in public sector. Strong analytical skills and proficiency in compensation survey tools and HRIS systems.',
    date: '2023-07-01'
  },
  {
    id: 'JP-HR-003', title: 'Human Resources Director', family: 'Executive Leadership', category: 'Human Resources',
    level: 'Executive', pay: 'Grade 22',
    desc: 'Directs all human resources functions including talent acquisition, employee relations, classification and compensation, benefits, training, and organizational development. Develops HR strategy aligned with the city\'s goals. Oversees labor relations and collective bargaining. Ensures compliance with all federal, state, and local employment laws. Advises executive leadership on workforce planning and organizational change.',
    quals: 'Bachelor\'s degree in Human Resources, Public Administration, or related field; Master\'s preferred. SPHR or SHRM-SCP certification required. Minimum 10 years of progressively responsible HR experience, including 5 years in a senior leadership role. Public sector experience strongly preferred.',
    date: '2022-12-01'
  },
  {
    id: 'JP-HR-004', title: 'Training & Development Specialist', family: 'Learning & Development', category: 'Human Resources',
    level: 'Individual Contributor', pay: 'Grade 11',
    desc: 'Designs, develops, and delivers training programs for city employees covering topics such as leadership development, workplace safety, diversity and inclusion, customer service, and software applications. Conducts training needs assessments, manages the learning management system (LMS), and evaluates program effectiveness through surveys and metrics.',
    quals: 'Bachelor\'s degree in Human Resources, Education, Organizational Development, or related field. Minimum 2 years of training and development experience. Experience with LMS platforms and e-learning authoring tools. Strong presentation and facilitation skills. CPTD or ATD certification preferred.',
    date: '2024-03-15'
  },
  {
    id: 'JP-PW-005', title: 'Traffic Engineer', family: 'Engineering', category: 'Public Works',
    level: 'Individual Contributor', pay: 'Grade 15',
    desc: 'Plans, designs, and manages traffic engineering projects including signal systems, signage, road markings, and traffic calming measures. Conducts traffic impact studies, analyzes crash data, and develops safety improvement plans. Reviews development proposals for traffic impacts and coordinates with regional transportation agencies.',
    quals: 'Bachelor\'s degree in Civil or Traffic Engineering. PE license required. Minimum 4 years of traffic engineering experience. PTOE certification preferred. Proficiency in traffic modeling software (Synchro, VISSIM) and GIS. Knowledge of MUTCD standards.',
    date: '2024-06-01'
  },
  {
    id: 'JP-FIN-005', title: 'Purchasing Agent', family: 'Procurement', category: 'Finance',
    level: 'Individual Contributor', pay: 'Grade 11', status: 'Inactive',
    desc: 'Manages the procurement of goods, services, and equipment for city departments in accordance with municipal purchasing policies and state procurement laws. Prepares and administers formal bids, requests for proposals (RFPs), and contracts. Evaluates vendor proposals, negotiates terms, and ensures best value purchasing.',
    quals: 'Bachelor\'s degree in Business Administration, Supply Chain Management, or related field. CPPB or NIGP-CPP certification preferred. Minimum 3 years of procurement experience, preferably in government. Knowledge of public procurement laws and contract administration.',
    date: '2023-04-01'
  }
];

function seed() {
  const db = getDatabase();

  // Clear existing data
  db.exec('DELETE FROM job_profiles');

  const insert = db.prepare(`
    INSERT INTO job_profiles (job_profile_id, job_title, job_family, job_category, management_level, job_description, qualifications, pay_grade, status, effective_date)
    VALUES (@id, @title, @family, @category, @level, @desc, @quals, @pay, @status, @date)
  `);

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run({
        id: item.id,
        title: item.title,
        family: item.family,
        category: item.category,
        level: item.level,
        desc: item.desc,
        quals: item.quals,
        pay: item.pay,
        status: item.status || 'Active',
        date: item.date
      });
    }
  });

  insertMany(profiles);
  console.log(`Seeded ${profiles.length} job profiles.`);
  db.close();
}

seed();
