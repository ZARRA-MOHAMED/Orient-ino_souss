import branchData from '../../data/parcourScholaire/branch.json';
import { Filiere } from '../../models/filiereModel';
import { Branch } from '../../models/branchModel'; // Assuming you have this
import { IBranch } from '../../types/branchTypes';

const seedBranch = async () => {
  try {
    for (const branch of branchData) {
      console.log(branch);
      // 1. Find the filiere document using its enum title
      const filiereDoc = await Filiere.findOne({ title: branch.filiere });

      if (!filiereDoc) {
        console.warn(`⚠️ Filiere '${branch.filiere}' not found for branch '${branch.title}'`);
        continue;
      }

      // 2. Construct the branch with the filiere _id
      const branchToInsert: Omit<IBranch, '_id'> = {
        title: branch.title,
        filiere: filiereDoc._id,
      };

      // 3. Optional: Prevent duplicates
      const existing = await Branch.findOne({ title: branch.title, filiere: filiereDoc._id });
      if (!existing) {
        await Branch.create(branchToInsert);
        console.log(`✅ Inserted branch: ${branch.title}`);
      } else {
        console.log(`ℹ️ Branch '${branch.title}' already exists.`);
      }
    }
  } catch (error) {
    console.error('❌ Error seeding branches:', error);
  }
};

export default seedBranch;
