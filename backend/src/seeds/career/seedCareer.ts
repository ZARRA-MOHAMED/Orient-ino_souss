import careers from '../../data/careers/careers.json';
import { Career } from '../../models/careerModel';

const seedCareers = async () => {
  try {
    await Career.insertMany(careers);
    console.log(`✅ Seeded ${careers.length} Careers successfully.`);
  } catch (error) {
    console.error('❌ Error seeding careers questions:', error);
  }
};

export default seedCareers;
