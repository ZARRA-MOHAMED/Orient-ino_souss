import mongoose from "mongoose";
import seedRIASEC from "../seeds/diagnostiques/seedRIASAC";
import seedOCEAN from "../seeds/diagnostiques/seedOCEAN";
import seedDEPRESSION from "../seeds/diagnostiques/seedDEPRESSION";
import seedSTRESS from "../seeds/diagnostiques/seedExaman_Anxiete";
import seedSELFESTEEM from "../seeds/diagnostiques/seedSELFESTEEM";
import seedINTERENETADDICTION from "../seeds/diagnostiques/seedINTERNETADDICTION";
import seedPRESSION from "../seeds/diagnostiques/seedPRESSION";
import seedSINCEREANXIETY from "../seeds/diagnostiques/seedSINCEREANXIETY";
import seedCareers from "../seeds/career/seedCareer";
import seedFiliere from "../seeds/scholarLevel/seedFiliere";
import seedBranch from "../seeds/scholarLevel/seedBranch";
import seedSchool from "../seeds/scholarLevel/seedSchool";
import diag from '../data/diagnostiques/diagnostiques.json';
import dotenv from "dotenv";
import { Diagnostique } from "../models/diagnostiqueModel";
import seedDiag from "../seeds/diagnostiques/seedDiagnostique";
import seedAnxieteFuture from "../seeds/diagnostiques/seedFutureStress";
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "";
    await mongoose.connect(mongoURI);
    // use it to seed the database
    // console.log(diag);
    // Diagnostique.insertMany(diag);

    // seedDiag();

    // --Diagnostiques--

    // await seedRIASEC();
    // await seedOCEAN();
    // await seedDEPRESSION();
    // await seedSTRESS();
    // await seedSELFESTEEM();
    // await seedINTERENETADDICTION();
    // await seedPRESSION();
    // await seedSINCEREANXIETY();
    // await seedCareers();
    // await seedFiliere();
    // await seedBranch();
    // await seedSchool();
    // await seedAnxieteFuture();

    // --Career--

    console.log("Connected successfully to mongo 🍵");
  } catch (error) {
    console.error("Error connecting to mongoDb ❌: ", error);
  }
};

export default connectDB;
