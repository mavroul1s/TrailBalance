import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = { bg:'#F7F6F1', ink:'#183B32', muted:'#52645B', accent:'#A64B24', light:'#E6EAE2' };
const FONT = 'Liberation Sans';
function text(slide,value,x,y,w,h,size=30,color=C.ink,bold=false) {
  const sh=slide.shapes.add({geometry:'textbox',name:value.slice(0,55),position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  sh.text=value; sh.text.style={typeface:FONT,fontSize:size,color,bold}; sh.text.insets=0;
  return sh;
}
function table(slide,values,y=180,height=340,widths=[400,376,376],size=27) {
  const t=slide.tables.add({rows:values.length,columns:values[0].length,left:64,top:y,width:1152,height,values,columnWidths:widths});
  t.borders.assign({fill:C.bg,width:2});
  for(let r=0;r<values.length;r++) for(let c=0;c<values[r].length;c++) {
    const cell=t.getCell(r,c); cell.fill=r===0?C.ink:(r%2===0?C.light:C.bg);
    cell.text.style={typeface:FONT,fontSize:size,color:r===0?C.bg:C.ink,bold:r===0};
  }
  return t;
}
function lines(s,values,x=64,y=190,w=1152,size=32,gap=68) {
  values.forEach((v,i)=>text(s,v,x,y+i*gap,w,58,size));
}
export async function build(presentation) {
  if(presentation.slides.items.length) throw new Error('Build expects an empty presentation');
  const content=JSON.parse(await fs.readFile(path.join(root,'presentations/milestone-01/slides.json'),'utf8'));
  for(const [i,d] of content.entries()) {
    const s=presentation.slides.add({width:1280,height:720}); s.background.fill=C.bg; s.speakerNotes.text=d.notes;
    if(d.kind==='cover') {
      s.background.fill=C.ink;
      text(s,d.title,72,158,1100,110,84,C.bg,true);
      text(s,d.subtitle,76,290,1080,90,44,C.bg);
      text(s,'Linear Programming · First progress presentation',76,427,1080,52,28,'#C9D5CB');
      text(s,'Nikolaos Mavros\nUniversity of Thessaly · 12 November 2026',76,555,1080,88,26,'#C9D5CB');
      continue;
    }
    text(s,d.title,64,48,1152,100,48,C.ink,true);
    text(s,String(i+1).padStart(2,'0')+(i>=12?'  /  APPENDIX':''),1090,674,160,25,17,C.muted);
    if(d.source) text(s,d.source,64,640,990,53,18,C.muted);
    if(d.kind==='problem') {
      text(s,'What should we pack\nfor this hike?',64,185,1120,150,48,C.ink,true);
      text(s,'Essential equipment and supplies\nFood and water for the stated trip\nA manageable backpack load',64,375,1130,160,34);
      text(s,'First example: fixed essentials and water, with two food quantities to choose',64,565,1152,60,29,C.accent,true);
    } else if(d.kind==='scenario') {
      text(s,'10 km\n500 m ascent\n4 hours assumed',64,190,520,200,44,C.ink,true);
      text(s,'One assumed 70 kg adult\nMild conditions, marked route\nNo overnight stay\nNo planned refill',650,192,566,240,32);
      text(s,'The conditions define what the packing plan must cover.',64,545,1152,65,34,C.accent,true);
    } else if(d.kind==='table') {
      const h=d.table.length===6?360:330;
      table(s,d.table,180,h,d.widths,27);
      text(s,d.bottom,64,560,1152,70,28,C.accent,true);
    } else if(d.kind==='water') {
      text(s,'Water',64,180,520,55,36,C.ink,true);
      text(s,'2.5 L ≈ 2.5 kg',64,262,560,90,56,C.accent,true);
      text(s,'0.5 L/hour × 4 hours = 2 L\nAdd an assumed 0.5 L reserve',64,380,560,115,30);
      text(s,'Pack allowance',680,180,536,55,36,C.ink,true);
      text(s,'7 kg',680,262,536,90,64,C.accent,true);
      text(s,'10% of the assumed 70 kg body mass\nA general day-hiking guideline',680,380,536,115,30);
      text(s,'Individual carrying limits need separate assessment.',64,555,1152,60,32,C.muted);
    } else if(d.kind==='lp_summary') {
      text(s,'Decision: servings of each food',64,170,1152,65,38,C.ink,true);
      text(s,'x₁ = tortilla servings      x₂ = tuna servings',64,254,1152,65,32);
      text(s,'Minimize food mass:  50x₁ + 74x₂  grams',64,352,1152,70,40,C.accent,true);
      text(s,'Meet the food targets and respect available stock.\nCheck the total backpack allowance.',64,465,1152,105,32);
      text(s,'The professor’s simplex method finds the best feasible mix.',64,580,1152,50,28,C.muted);
    } else if(d.kind==='packing_result') {
      text(s,'4 tortilla servings\n1 tuna serving',64,175,520,135,42,C.ink,true);
      text(s,'274 g of ration',64,335,525,80,52,C.accent,true);
      text(s,'630 kcal and 33 g protein\nWhole backpack: 5.074 kg\nPlanning margin: 1.926 kg',64,450,530,150,30);
      const style={typeface:FONT,fontSize:20,fill:C.ink};
      s.charts.add('bar',{
        position:{left:620,top:170,width:590,height:425},
        title:'Backpack mass by component',titleTextStyle:{...style,fontSize:25},
        categories:['Fixed kit','Water','Ration'],
        series:[{name:'Mass (kg)',values:[2.3,2.5,0.274],fill:'#526F5D'}],
        barOptions:{direction:'column',grouping:'clustered',gapWidth:85},hasLegend:false,
        xAxis:{textStyle:style},
        yAxis:{min:0,max:3,majorUnit:1,title:{text:'kg',textStyle:style},textStyle:style,majorGridlines:{fill:C.light,width:1}},
        dataLabels:{showValue:true,position:'outEnd',textStyle:{...style,fontSize:21}},
        chartFill:C.bg,plotAreaFill:C.bg
      });
    } else if(d.kind==='interpretation') {
      lines(s,[
        'A packing decision can be solved and checked against stated needs.',
        'The food choice saves 174 g compared with packing all the stock.',
        'This inventory fits comfortably within the chosen pack allowance.'
      ],64,190,1152,31,90);
      text(s,'Next data: measured kit masses, more foods and a tighter capacity scenario',64,505,1152,85,34,C.accent,true);
      text(s,'Current kit masses and food targets are classroom assumptions.',64,592,1152,45,26,C.muted);
    } else if(d.kind==='future') {
      text(s,'Expanding the packing problem',64,180,580,60,34,C.accent,true);
      text(s,'Measured masses and packed volume\nMore food and equipment choices\nWhole items and shared supplies\nFair allocation across a group',64,280,560,260,30);
      text(s,'Website direction',680,180,536,60,34,C.accent,true);
      text(s,'Trip details and available inventory\nAn understandable packing list\nTotal load and remaining capacity\nClear explanations when needs conflict',680,280,536,260,30);
      text(s,'Each progress presentation adds one manageable extension.',64,575,1152,55,31,C.muted);
    } else if(d.kind==='model') {
      text(s,'x₁ = tortilla servings      x₂ = tuna servings',64,165,1152,60,32);
      text(s,'Minimize  M = 50x₁ + 74x₂',64,244,1152,65,40,C.accent,true);
      lines(s,['140x₁ + 70x₂ ≥ 630 kcal','4x₁ + 17x₂ ≥ 33 g protein','0 ≤ x₁ ≤ 6,     0 ≤ x₂ ≤ 2','4800 + M ≤ 7000 g'],64,340,1152,32,64);
    } else if(d.kind==='transform') {
      text(s,'y₁ = 6 − x₁       y₂ = 2 − x₂',64,165,1152,65,38,C.accent,true);
      text(s,'Maximize  ζ = 50y₁ + 74y₂',64,252,1152,65,40,C.ink,true);
      lines(s,['140y₁ + 70y₂ ≤ 350','4y₁ + 17y₂ ≤ 25','0 ≤ y₁ ≤ 6,     0 ≤ y₂ ≤ 2'],64,345,1152,34,66);
      text(s,'Zero removal keeps the full inventory and gives a feasible slack basis.',64,570,1152,60,28,C.muted);
    } else if(d.kind==='matrix') {
      text(s,'x = (y₁, y₂, s₁, s₂, s₃, s₄)',64,165,1152,60,34,C.accent,true);
      table(s,[['A','y₁','y₂','s₁','s₂','s₃','s₄','b'],['Energy','140','70','1','0','0','0','350'],['Protein','4','17','0','1','0','0','25'],['Tortilla stock','1','0','0','0','1','0','6'],['Tuna stock','0','1','0','0','0','1','2']],255,290,[230,125,125,125,125,125,125,172],25);
      text(s,'c = (50, 74, 0, 0, 0, 0). Initial basis matrix: I₄.',64,578,1152,55,31);
    } else if(d.kind==='pivot1') {
      text(s,'Reduced costs (−50, −74). Enter y₂.',64,164,1152,56,34,C.accent,true);
      table(s,[['Basic','Value','Direction','Ratio'],['s₁','350','70','5'],['s₂','25','17','25/17  (minimum)'],['s₃','6','0','Excluded'],['s₄','2','1','2']],245,260,[220,230,280,422],27);
      text(s,'Step = 25/17. Protein slack s₂ leaves the basis.',64,547,1152,60,32,C.ink,true);
    } else if(d.kind==='pivot2') {
      text(s,'Improving reduced cost: −554/17. Enter y₁.',64,164,1152,56,34,C.accent,true);
      table(s,[['Basic','Value','Direction','Ratio'],['s₁','4200/17','2100/17','2  (minimum)'],['y₂','25/17','4/17','25/4'],['s₃','6','1','6'],['s₄','9/17','−4/17','Excluded']],245,260,[220,230,280,422],27);
      text(s,'Step = 2. Energy slack s₁ leaves. Final removal: y = (2, 1).',64,547,1152,65,31,C.ink,true);
    } else if(d.kind==='certificate') {
      text(s,'λ₁ = 277/1050       λ₂ = 49/15       both ≥ 0',64,175,1152,65,36,C.accent,true);
      lines(s,['140λ₁ + 4λ₂ = 50','70λ₁ + 17λ₂ = 74','Every feasible ration has M ≥ 630λ₁ + 33λ₂ = 274 g.'],64,280,1152,32,80);
      text(s,'Our feasible ration attains 274 g, proving the minimum.',64,559,1152,65,34,C.ink,true);
    } else if(d.kind==='refs1') {
      lines(s,[
        '[R1] The Simplex Method in Matrix Notation. Course handout,',
        '        26 Oct 2026. Physical pp. 3–11, 12–18. Author unidentified.',
        '[R2] Jiří Matoušek & Bernd Gärtner. Understanding and Using',
        '        Linear Programming. Springer, 2007. doi:10.1007/978-3-540-30717-4',
        '[R3] U.S. National Park Service. Ten Essentials.',
        '        nps.gov/articles/10essentials.htm',
        '[R4] American Hiking Society. The Ten Essentials of Hiking.',
        '        americanhiking.org/10essentials/',
        '[R5] Joe Pasteris, REI. How Much Should Your Pack Weigh?',
        '        rei.com/learn/expert-advice/backpacking-weight.html'
      ],64,170,1152,25,46);
    } else if(d.kind==='refs2') {
      lines(s,[
        '[R6] REI. How to Size and Fit a Backpack.',
        '        rei.com/learn/expert-advice/backpacks-adjusting-fit.html',
        '[R7] Mission. Soft Taco Restaurant Style Flour Tortillas, label.',
        '        missionfoods.com/products/soft-taco-restaurant-style-flour-tortillas',
        '[R8] StarKist. Light Tuna in Water (Pouch), 74 g label.',
        '        starkist.com/product/light-tuna-in-water-pouch/',
        '[R9] Walsh, Low & Arkesteijn. Older-adult load-carriage study.',
        '        J. Biomech. 73 (2018), 18–23. doi:10.1016/j.jbiomech.2018.03.018',
        '[R10] Vickery-Howe et al. Male/female military load-carriage study.',
        '        Biomechanics 4 (2024), 382–410. doi:10.3390/biomechanics4030027'
      ],64,170,1152,25,46);
    }
  }
  return content;
}
if(typeof process!=='undefined' && process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const {Presentation,PresentationFile}=await import('@oai/artifact-tool');
  const p=Presentation.create({slideSize:{width:1280,height:720}}); await build(p);
  await (await PresentationFile.exportPptx(p)).save(path.join(root,'presentations/milestone-01/TrailBalance-Milestone-01.pptx'));
  console.log('PowerPoint saved. Use LibreOffice or PowerPoint to export a PDF.');
}
