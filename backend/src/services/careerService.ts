const careerService= (user: {[key: string]: number}) =>{
      
      // Map RIASEC codes to their full names
      const riasecNames = {
        "R": "Realistic",
        "A": "Artistic",
        "I": "Investigative",
        "S": "Social",
        "E": "Enterprising",
        "C": "Conventional"
      };
      console.log(user);
      // Get top 3 keys sorted by highest value
      const top3 = Object.entries(user)
        .sort((a, b) => b[1] - a[1])  // Sort descending by value
        .slice(0, 3)                   // Take top 3
        .map(([key, value]) => riasecNames[key]); // Replace with full name
        
      return top3 as string[];
}

export default careerService;