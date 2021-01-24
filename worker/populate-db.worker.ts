import { LeakEntity } from './../src/models/entities/leak.entity';
import { SetupServer } from './../src/server';
import { getConnection } from 'typeorm';
import * as config from './../src/config';
const fs = require('fs');
const readline = require('readline');

(async () => {
  const server = new SetupServer(+config.getEnv('PORT'), config.getEnv('ENV'));
  await server.init();

  const filename = process.argv.pop();
  const readLineInterface = readline.createInterface({
    input: fs.createReadStream(filename),
    crlfDelay: Infinity,
  });

  readLineInterface.on('line', async line => {
    try {
      if (!line.includes('CPF Entrada')) {
        const marks = line.slice(12).split('|');
        const leak = new LeakEntity();

        leak.cpf = line.slice(0, 11);
        leak.hasBasicInformation = marks[0] === '•';
        leak.hasEmail = marks[1] === '•';
        leak.hasPhoneNumber = marks[2] === '•';
        leak.hasAddress = marks[3] === '•';
        leak.hasMosaic = marks[4] === '•';
        leak.hasOccupation = marks[5] === '•';
        leak.hasCreditScore = marks[6] === '•';
        leak.hasRG = marks[7] === '•';
        leak.hasVoterTitleCard = marks[8] === '•';
        leak.hasEducationLevel = marks[9] === '•';
        leak.hasBusinessPartners = marks[10] === '•';
        leak.hasInternalRevenueService = marks[11] === '•';
        leak.hasSocialClassLevel = marks[12] === '•';
        leak.hasMaritalStatus = marks[13] === '•';
        leak.hasEmployment = marks[14] === '•';
        leak.hasAffinityModel = marks[15] === '•';
        leak.hasAnalytical = marks[16] === '•';
        leak.hasPurchasingPower = marks[17] === '•';
        leak.hasPhoto = marks[18] === '•';
        leak.hasPublicServants = marks[19] === '•';
        leak.hasChecksWithNoFunds = marks[20] === '•';
        leak.isDebtor = marks[21] === '•';
        leak.isInFamilyGrantProgram = marks[22] === '•';
        leak.hasUniversity = marks[23] === '•';
        leak.hasAdvicers = marks[24] === '•';
        leak.hasHouseholds = marks[25] === '•';
        leak.hasLinkages = marks[26] === '•';
        leak.hasLinkedIn = marks[27] === '•';
        leak.hasSalary = marks[28] === '•';
        leak.hasIncome = marks[29] === '•';
        leak.hasDeceased = marks[30] === '•';
        leak.hasIRPF = marks[31] === '•';
        leak.hasINSS = marks[32] === '•';
        leak.hasFGTS = marks[33] === '•';
        leak.hasCNS = marks[34] === '•';
        leak.hasNIS = marks[35] === '•';
        leak.hasPIS = marks[36] === '•';

        const saved = await getConnection().manager.save(leak);
        console.log(`Saved ${saved.cpf}!`);
      }
    } catch (err) {
      console.error(
        `Error while processing the following line: ${line.slice(
          0,
          11
        )}. Message: ${err.message}`
      );
    }
  });
})();
