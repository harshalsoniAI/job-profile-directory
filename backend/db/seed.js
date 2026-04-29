require('dotenv').config();
const { supabase } = require('./database');

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
    id: 'JP-FIN-001', title: 'Budget Analyst', family: 'Financial Analysis', category: 'Finance',
    level: 'Individual Contributor', pay: 'Grade 13',
    desc: 'Analyzes budget proposals, monitors expenditures, and prepares financial reports for city departments. Assists in the preparation of the annual operating and capital budgets. Reviews purchase requests and contracts for budget compliance. Develops financial forecasts and conducts cost-benefit analyses to support decision-making.',
    quals: 'Bachelor\'s degree in Finance, Accounting, Public Administration, or related field. Minimum 2 years of budget analysis or financial planning experience, preferably in government. Proficiency in Excel, ERP systems, and financial reporting tools. Strong analytical and communication skills.',
    date: '2024-02-01'
  },
  {
    id: 'JP-IT-001', title: 'Systems Administrator', family: 'Infrastructure & Operations', category: 'Information Technology',
    level: 'Individual Contributor', pay: 'Grade 14',
    desc: 'Manages and maintains the city\'s server infrastructure, network systems, and cloud environments. Implements security patches, monitors system performance, and ensures 99.9% uptime for critical municipal applications. Provides Tier 3 technical support and leads disaster recovery planning and testing.',
    quals: 'Bachelor\'s degree in Computer Science, Information Technology, or related field. Minimum 3 years of systems administration experience. Certifications such as CompTIA Server+, Microsoft MCSA, or AWS Solutions Architect preferred. Experience with Windows Server, Linux, VMware, and Azure/AWS.',
    date: '2024-04-01'
  }
];

async function seed() {
  console.log('Seeding Supabase data...');

  // 1. Find the Malgudi organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .select('id')
    .eq('slug', 'malgudi')
    .single();

  if (orgError || !org) {
    console.error('Error finding Malgudi organization. Did you run the SQL in Supabase?', orgError);
    return;
  }

  // 2. Prepare profiles for insertion
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

  // 3. Clear and Insert
  const { error: deleteError } = await supabase
    .from('job_profiles')
    .delete()
    .eq('organization_id', org.id);

  if (deleteError) console.error('Error clearing old data:', deleteError);

  const { data: inserted, error: insertError } = await supabase
    .from('job_profiles')
    .insert(profilesToInsert)
    .select();

  if (insertError) {
    console.error('Error inserting profiles:', insertError);
  } else {
    console.log(`Successfully seeded ${inserted.length} profiles for Malgudi.`);
  }
}

seed();
