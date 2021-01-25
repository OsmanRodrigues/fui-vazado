import { LeakEntity } from './../src/models/entities/leak.entity';
import { SetupServer } from './../src/server';
import { getConnection } from 'typeorm';
import * as config from './../src/config';
import * as fs from 'fs';
import * as readline from 'readline';

(async () => {
  const chunk = 1000;
  const buffer: string[] = [];
  const dot = '•';
  let lines: string[] = [];
  let totalSaved = 0;
  let realAmount = 0;
  let isPaused = false;

  const server = new SetupServer(+config.getEnv('PORT'), config.getEnv('ENV'));
  await server.init();

  const filename = <string>process.argv.pop();
  const readLineInterface = readline.createInterface({
    input: fs.createReadStream(filename),
    crlfDelay: Infinity,
  });

  readLineInterface.on('line', async (line: string) => {
    try {
      realAmount++;
      if (isPaused) {
        buffer.push(line);
      } else {
        lines.push(line);
      }

      if (lines.length >= chunk && !isPaused) {
        readLineInterface.pause();
      }
    } catch (err) {
      const cpf = line.slice(0, 11);
      console.error(`Error processing line: ${cpf}. Message: ${err.message}`);
    }
  });

  readLineInterface.on('pause', async () => {
    isPaused = true;
    await proccessLines();
  });

  readLineInterface.on('resume', async () => {
    isPaused = false;
  });

  async function proccessLines() {
    const leaks: LeakEntity[] = [];

    for (const line of lines) {
      if (!line.includes('CPF Entrada')) {
        leaks.push(createLeakBasedOnLine(line));
      }
    }

    totalSaved += (await getConnection().manager.save(leaks)).length;
    console.log(
      `Total ${totalSaved} / Buffer ${buffer.length} / Lines ${lines.length} / Amount ${realAmount}`
    );

    lines.length = 0;
    lines = [...buffer];
    buffer.length = 0;
    readLineInterface.resume();
  }

  function createLeakBasedOnLine(line: string) {
    const marks = line.slice(12).split('|');
    const leak = new LeakEntity();

    leak.cpf = line.slice(0, 11);
    leak.hasBasicInformation = marks[0] === dot;
    leak.hasEmail = marks[1] === dot;
    leak.hasPhoneNumber = marks[2] === dot;
    leak.hasAddress = marks[3] === dot;
    leak.hasMosaic = marks[4] === dot;
    leak.hasOccupation = marks[5] === dot;
    leak.hasCreditScore = marks[6] === dot;
    leak.hasRG = marks[7] === dot;
    leak.hasVoterTitleCard = marks[8] === dot;
    leak.hasEducationLevel = marks[9] === dot;
    leak.hasBusinessPartners = marks[10] === dot;
    leak.hasInternalRevenueService = marks[11] === dot;
    leak.hasSocialClassLevel = marks[12] === dot;
    leak.hasMaritalStatus = marks[13] === dot;
    leak.hasEmployment = marks[14] === dot;
    leak.hasAffinityModel = marks[15] === dot;
    leak.hasAnalytical = marks[16] === dot;
    leak.hasPurchasingPower = marks[17] === dot;
    leak.hasPhoto = marks[18] === dot;
    leak.hasPublicServants = marks[19] === dot;
    leak.hasChecksWithNoFunds = marks[20] === dot;
    leak.isDebtor = marks[21] === dot;
    leak.isInFamilyGrantProgram = marks[22] === dot;
    leak.hasUniversity = marks[23] === dot;
    leak.hasAdvicers = marks[24] === dot;
    leak.hasHouseholds = marks[25] === dot;
    leak.hasLinkages = marks[26] === dot;
    leak.hasLinkedIn = marks[27] === dot;
    leak.hasSalary = marks[28] === dot;
    leak.hasIncome = marks[29] === dot;
    leak.hasDeceased = marks[30] === dot;
    leak.hasIRPF = marks[31] === dot;
    leak.hasINSS = marks[32] === dot;
    leak.hasFGTS = marks[33] === dot;
    leak.hasCNS = marks[34] === dot;
    leak.hasNIS = marks[35] === dot;
    leak.hasPIS = marks[36] === dot;

    return leak;
  }
})();
