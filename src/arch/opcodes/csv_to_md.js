const fs = require('fs');
const csv = require('csv-parser');

const args = process.argv.slice(2);

const TABLE_HEADER = '| xxxxxxx<br/>Opcode ' +
  '| xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax ' +
  '| xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax ' +
  '| xxxxxxxxxxxxxxxxx<br/>Stack ' +
  '| xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description ' +
  '| xxxx<br/>Gas |\n' +
  '|:-|:-|:-|:-|:-|:-|';

const categories = {};
const cmdToName = {};

const makeLink = (text, cmd) => {
  if (!(cmd in cmdToName)) {
    return text;
  }
  const name = cmdToName[cmd];
  return `[${text}](#${nameToId(name)})`;
};

const genLinks = (text) => {
  return text.replace(/`([^ `][^`]* )?([A-Z0-9#-]+)`/g,
    (match, group1, group2) => makeLink(match, group2));
};

const nameToId = (s) => {
  return `instr-${s.toLowerCase().replace(/_|#/g, (match) => match === '_' ? '-' : 'SHARP')}`;
};

const makeTable = (cat) => {
  if (!(cat in categories)) {
    console.error('No such category', cat);
    return '';
  }
  const table = [TABLE_HEADER];
  for (const row of categories[cat]) {
    let { opcode, fift_asm, stack, description, gas, tvm_asm } = row;

    if (opcode !== '') {
      opcode = `**\`${opcode}\`**`;
    }

    if (fift_asm !== '') {
      fift_asm = fift_asm.split('\n').map((s) => `\`${s.trim()}\``).join('<br/>');
    }

    if (tvm_asm !== '') {
      tvm_asm = tvm_asm.split('\n').map((s) => `\`${s.trim()}\``).join('<br/>');
      tvm_asm = tvm_asm.replace(/\|/g, '\｜');
    }

    if (stack !== '') {
      stack = `_\`${stack}\`_`;
      stack = stack.replace(/\|/g, '\\|').trim();
    }

    description = description.replace(/\|/g, '\\|');
    description = description.replace(/\n/g, '<br/>');

    if (gas !== '') {
      gas = gas.replace(/\|/g, '\\|');
      gas = `\`${gas}\``;
    }

    description = genLinks(description);
    description = `<div id='${nameToId(row.name)}'>` + description + `</div>`;

    table.push(`| ${opcode} | ${fift_asm} | ${tvm_asm} | ${stack} | ${description} | ${gas} |`);
  }

  return table.join('\n');
};

const docTemplate = fs.readFileSync(args[1], 'utf8');
const templ = genLinks(docTemplate);

fs.createReadStream(args[0])
  .pipe(csv())
  .on('data', (row) => {
    const cat = row.category;
    if (!(cat in categories)) {
      categories[cat] = [];
    }
    categories[cat].push(row);
    if (row.name !== '') {
      for (const s of row.fift_asm.split('\n')) {
        const trimmedS = s.trim();
        if (trimmedS !== '') {
          const lastWord = trimmedS.split(' ').pop();
          if (!(lastWord in cmdToName)) {
            cmdToName[lastWord] = row.name;
          }
        }
      }
    }
  })
  .on('end', () => {
    let doc = docTemplate.replace(/{{ *Table: *([a-zA-Z0-9_-]+) *}}/g,
      (match, group1) => makeTable(group1));

    doc = doc.replace(/{{ *Template *}}/g,
      'TVM Instructions');

    fs.writeFileSync(args[2], doc);
  });
