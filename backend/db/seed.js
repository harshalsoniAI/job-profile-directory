require('dotenv').config();
const { supabase } = require('./database');

const profiles = [
  // PUBLIC WORKS
  { id: 'JP-PW-001', title: 'Civil Engineer', family: 'Engineering', category: 'Public Works', level: 'Individual Contributor', pay: 'Grade 14', desc: 'Designs and oversees construction of public infrastructure including roads and water systems.', quals: 'Bachelor\'s degree in Civil Engineering. PE license preferred.', date: '2024-01-15' },
  { id: 'JP-PW-002', title: 'Maintenance Worker II', family: 'Trades', category: 'Public Works', level: 'Individual Contributor', pay: 'Grade 7', desc: 'Performs semi-skilled maintenance on city facilities and streets.', quals: 'High school diploma. Valid CDL preferred.', date: '2023-11-01' },
  { id: 'JP-PW-003', title: 'Public Works Director', family: 'Leadership', category: 'Public Works', level: 'Executive', pay: 'Grade 22', desc: 'Provides executive leadership for all Public Works operations.', quals: 'Bachelor\'s degree in Engineering or Public Admin. 10+ years experience.', date: '2023-06-01' },
  { id: 'JP-PW-004', title: 'Water Plant Operator', family: 'Utilities', category: 'Public Works', level: 'Individual Contributor', pay: 'Grade 10', desc: 'Operates water treatment processes to ensure safe drinking water.', quals: 'Water Treatment Operator certification required.', date: '2024-03-01' },
  { id: 'JP-PW-005', title: 'Traffic Engineer', family: 'Engineering', category: 'Public Works', level: 'Individual Contributor', pay: 'Grade 15', desc: 'Plans and designs traffic signal systems and road markings.', quals: 'PE license and traffic engineering experience required.', date: '2024-06-01' },

  // FINANCE
  { id: 'JP-FIN-001', title: 'Budget Analyst', family: 'Finance', category: 'Finance', level: 'Individual Contributor', pay: 'Grade 13', desc: 'Analyzes budget proposals and monitors expenditures.', quals: 'Bachelor\'s degree in Finance or Accounting.', date: '2024-02-01' },
  { id: 'JP-FIN-002', title: 'Accountant II', family: 'Finance', category: 'Finance', level: 'Individual Contributor', pay: 'Grade 12', desc: 'Performs professional accounting work and financial statement preparation.', quals: 'Bachelor\'s degree in Accounting. CPA preferred.', date: '2023-09-15' },
  { id: 'JP-FIN-003', title: 'Finance Director', family: 'Leadership', category: 'Finance', level: 'Executive', pay: 'Grade 23', desc: 'Directs all financial operations including budgeting and treasury.', quals: 'Master\'s degree or CPA required. 10+ years government finance exp.', date: '2023-01-15' },
  { id: 'JP-FIN-004', title: 'Payroll Specialist', family: 'Finance', category: 'Finance', level: 'Individual Contributor', pay: 'Grade 9', desc: 'Processes bi-weekly payroll for all city employees.', quals: '2+ years payroll experience. FPC certification preferred.', date: '2024-01-01' },
  { id: 'JP-FIN-005', title: 'Purchasing Agent', family: 'Procurement', category: 'Finance', level: 'Individual Contributor', pay: 'Grade 11', desc: 'Manages procurement of goods and services for city departments.', quals: 'Bachelor\'s in Business. Procurement certification preferred.', date: '2023-04-01' },

  // INFORMATION TECHNOLOGY
  { id: 'JP-IT-001', title: 'Systems Administrator', family: 'IT', category: 'Information Technology', level: 'Individual Contributor', pay: 'Grade 14', desc: 'Manages server infrastructure and network systems.', quals: '3+ years systems admin experience. Certifications preferred.', date: '2024-04-01' },
  { id: 'JP-IT-002', title: 'GIS Analyst', family: 'IT', category: 'Information Technology', level: 'Individual Contributor', pay: 'Grade 13', desc: 'Develops and maintains geographic information systems and maps.', quals: 'Proficiency in ArcGIS and spatial analysis required.', date: '2023-10-15' },
  { id: 'JP-IT-003', title: 'IT Director', family: 'Leadership', category: 'Information Technology', level: 'Executive', pay: 'Grade 22', desc: 'Provides strategic leadership for all city technology services.', quals: '10+ years IT experience including 5 years in leadership.', date: '2023-03-01' },
  { id: 'JP-IT-004', title: 'Help Desk Technician', family: 'IT', category: 'Information Technology', level: 'Individual Contributor', pay: 'Grade 8', desc: 'Provides technical support to city employees for hardware/software.', quals: 'CompTIA A+ and 1 year technical support experience.', date: '2024-05-01' },

  // PARKS & RECREATION
  { id: 'JP-PR-001', title: 'Recreation Coordinator', family: 'Programs', category: 'Parks & Recreation', level: 'Individual Contributor', pay: 'Grade 11', desc: 'Plans and oversees community recreational programs and events.', quals: 'Bachelor\'s in Recreation Management or related field.', date: '2024-02-15' },
  { id: 'JP-PR-002', title: 'Park Maintenance Supervisor', family: 'Maintenance', category: 'Parks & Recreation', level: 'Supervisor', pay: 'Grade 12', desc: 'Supervises crews responsible for park and field upkeep.', quals: '4+ years park maintenance exp including supervision.', date: '2023-08-01' },
  { id: 'JP-PR-003', title: 'Parks Director', family: 'Leadership', category: 'Parks & Recreation', level: 'Executive', pay: 'Grade 21', desc: 'Leads the Parks & Recreation department and strategic planning.', quals: '8+ years experience in park administration.', date: '2023-05-01' },
  { id: 'JP-PR-004', title: 'Aquatics Manager', family: 'Programs', category: 'Parks & Recreation', level: 'Manager', pay: 'Grade 13', desc: 'Manages city aquatic facilities and swim programs.', quals: 'Lifeguard Instructor and CPO certifications required.', date: '2024-04-15' },

  // HUMAN RESOURCES
  { id: 'JP-HR-001', title: 'HR Generalist', family: 'HR', category: 'Human Resources', level: 'Individual Contributor', pay: 'Grade 12', desc: 'Provides HR support including recruitment and employee relations.', quals: '3+ years HR experience. PHR certification preferred.', date: '2024-01-01' },
  { id: 'JP-HR-002', title: 'Comp & Class Analyst', family: 'HR', category: 'Human Resources', level: 'Individual Contributor', pay: 'Grade 14', desc: 'Conducts job classification and salary survey studies.', quals: 'Experience in point-factor evaluation and market analysis.', date: '2023-07-01' },
  { id: 'JP-HR-003', title: 'HR Director', family: 'Leadership', category: 'Human Resources', level: 'Executive', pay: 'Grade 22', desc: 'Directs all human resources functions and strategy.', quals: '10+ years HR experience including 5 years in leadership.', date: '2022-12-01' },
  { id: 'JP-HR-004', title: 'Training Specialist', family: 'HR', category: 'Human Resources', level: 'Individual Contributor', pay: 'Grade 11', desc: 'Designs and delivers employee training programs.', quals: 'Experience in LMS administration and program design.', date: '2024-03-15' }
];

async function seed() {
  console.log('🚀 Starting SaaS Seeding (Full Dataset)...');

  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .upsert({ 
      name: 'City of Malgudi', 
      slug: 'malgudi',
      primary_color: '#0f2744',
      accent_color: '#0ea5a0' 
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (orgError) {
    console.error('❌ Error ensuring organization exists:', orgError);
    return;
  }

  const profilesToInsert = profiles.map(p => ({
    organization_id: org.id,
    job_profile_id: p.id,
    job_title: p.title,
    job_family: p.family,
    job_category: p.category,
    management_level: p.level,
    job_description: p.desc,
    qualifications: p.quals,
    pay_grade: p.pay,
    status: 'Active',
    effective_date: p.date
  }));

  await supabase.from('job_profiles').delete().eq('organization_id', org.id);

  const { data: inserted, error: insertError } = await supabase
    .from('job_profiles')
    .insert(profilesToInsert)
    .select();

  if (insertError) {
    console.error('❌ Error inserting job profiles:', insertError);
  } else {
    console.log(`🎉 Successfully seeded ${inserted.length} profiles for ${org.name}!`);
  }
}

seed();
