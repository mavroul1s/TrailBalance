import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = { bg:'#F7F6F1', ink:'#183B32', muted:'#52645B', accent:'#A64B24', light:'#E6EAE2' };
const FONT = 'Liberation Sans';

function text(slide, value, x, y, w, h, size=30, color=C.ink, bold=false) {
  const shape=slide.shapes.add({geometry:'textbox',name:value.slice(0,55),position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  shape.text=value;
  shape.text.style={typeface:FONT,fontSize:size,color,bold};
  shape.text.insets=0;
  return shape;
}
function table(slide, values, y=184, height=330, widths=[400,376,376], size=27) {
  const t=slide.tables.add({rows:values.length,columns:values[0].length,left:64,top:y,width:1152,height,values,columnWidths:widths});
  t.borders.assign({fill:C.bg,width:2});
  for(let r=0;r<values.length;r++) for(let c=0;c<values[r].length;c++) {
    const cell=t.getCell(r,c);
    cell.fill=r===0?C.ink:(r%2===0?C.light:C.bg);
    cell.text.style={typeface:FONT,fontSize:size,color:r===0?C.bg:C.ink,bold:r===0};
  }
  return t;
}
function lines(s, values, x=64, y=190, w=1152, size=32, gap=68) {
  values.forEach((v,i)=>text(s,v,x,y+i*gap,w,58,size));
}

export async function build(presentation) {
  if(presentation.slides.items.length) throw new Error('Build expects an empty presentation');
  const content=JSON.parse(await fs.readFile(path.join(root,'presentations/milestone-01/slides.json'),'utf8'));
  for(const [i,d] of content.entries()) {
    const s=presentation.slides.add({width:1280,height:720});
    s.background.fill=C.bg;
    s.speakerNotes.text=d.notes;
    if(d.kind==='cover') {
      s.background.fill=C.ink;
      text(s,d.title,72,158,1100,110,84,C.bg,true);
      text(s,d.subtitle,76,290,1080,90,44,C.bg);
      text(s,'Linear Programming · First progress presentation',76,427,1080,52,28,'#C9D5CB');
      text(s,'Nikolaos Mavros\nUniversity of Thessaly · 12 November 2026',76,555,1080,88,26,'#C9D5CB');
      continue;
    }
    text(s,d.title,64,48,1152,100,48,C.ink,true);
    text(s,String(i+1).padStart(2,'0')+(i>=12?'  /  APPENDIX':''),1090,669,160,25,17,C.muted);
    if(d.source) text(s,d.source,64,638,990,52,18,C.muted);
    if(d.kind==='scenario') {
      text(s,'10 km\n500 m ascent\n4 hours assumed',64,190,520,200,44,C.ink,true);
      text(s,'One 70 kg adult\nMild conditions, marked route\nNo overnight stay or planned refill',650,192,566,180,30);
      text(s,'Fixed kit  2.3 kg',64,450,520,55,36,C.accent,true);
      text(s,'Water  2.5 L ≈ 2.5 kg',650,450,566,55,36,C.accent,true);
      text(s,'Decision: the lightest ration that meets our stated food targets',64,555,1152,60,32);
    } else if(d.kind==='table') {
      table(s,d.table,180,340,d.widths,27);
      text(s,d.bottom,64,555,1152,70,28,C.accent,true);
    } else if(d.kind==='model') {
      text(s,'minimize  M = 50t + 74u',64,175,1152,65,42,C.accent,true);
      lines(s,['140t + 70u ≥ 630 kcal','4t + 17u ≥ 33 g protein','0 ≤ t ≤ 6,     0 ≤ u ≤ 2','4800 + M ≤ 7000 g'],64,270,1152,34,65);
      text(s,'All available food weighs 448 g. The pack limit is redundant here.',64,560,1152,62,28,C.muted);
    } else if(d.kind==='transform') {
      text(s,'yT = 6 − t       yU = 2 − u',64,164,1152,65,38,C.accent,true);
      text(s,'maximize  ζ = 50yT + 74yU',64,248,1152,64,40,C.ink,true);
      lines(s,['140yT + 70yU ≤ 350','4yT + 17yU ≤ 25','0 ≤ yT ≤ 6,     0 ≤ yU ≤ 2'],64,335,1152,34,66);
      text(s,'y = (0, 0) means packing the full inventory. The slack basis is feasible.',64,560,1152,66,28,C.muted);
    } else if(d.kind==='algorithm') {
      text(s,'xB = B^-1 b      zN = N^T B^-T cB − cN',64,175,1152,66,34,C.accent,true);
      lines(s,['1. Enter a nonbasic variable with z < 0.','2. Compute direction d = B^-1 a_j.','3. Take min(xB_i / d_i) over d_i > 0.','4. Exchange the leaving and entering columns.'],64,280,1152,32,68);
      text(s,'Stop when all zN ≥ 0. This uses the handout\'s sign convention.',64,573,1152,50,28,C.muted);
    } else if(d.kind==='pivot1') {
      text(s,'Initial zN = (−50, −74). Enter yU.',64,164,1152,56,34,C.accent,true);
      table(s,[['Basic','Value','Direction','Ratio'],['sE','350','70','5'],['sP','25','17','25/17  ← minimum'],['sT','6','0','Excluded'],['sU','2','1','2']],245,260,[220,230,280,422],27);
      text(s,'Step = 25/17. Protein slack sP leaves the basis.',64,546,1152,60,32,C.ink,true);
    } else if(d.kind==='pivot2') {
      text(s,'z_yT = −554/17. Enter yT.',64,164,1152,56,34,C.accent,true);
      table(s,[['Basic','Value','Direction','Ratio'],['sE','4200/17','2100/17','2  ← minimum'],['yU','25/17','4/17','25/4'],['sT','6','1','6'],['sU','9/17','−4/17','Excluded']],245,260,[220,230,280,422],27);
      text(s,'sE leaves. Final y = (2, 1), with zN = (277/1050, 49/15) ≥ 0.',64,546,1152,68,31,C.ink,true);
    } else if(d.kind==='result') {
      text(s,'4 tortilla servings\n1 tuna serving',64,175,510,130,42,C.ink,true);
      text(s,'274 g',64,330,480,90,70,C.accent,true);
      text(s,'630 kcal · 33 g protein\nPack total 5.074 kg\nPlanning margin 1.926 kg',64,438,505,160,30);
      const style={fontFamily:FONT,typeface:FONT,fontSize:18,fill:C.ink};
      s.charts.add('scatter',{
        position:{left:600,top:165,width:615,height:430},
        title:'Two simplex pivots',titleTextStyle:{...style,fontSize:23},
        scatterOptions:{style:'lineWithMarkers'},
        series:[
          {name:'Simplex path',smooth:false,xValues:[0,0,2],values:[0,1.4705882353,1],line:{fill:C.ink,width:4},marker:{symbol:'circle',size:8,fill:C.ink}}
        ],
        hasLegend:false,
        xAxis:{min:0,max:3,majorUnit:1,title:{text:'Tortilla servings removed',textStyle:style},textStyle:style},
        yAxis:{min:0,max:2,majorUnit:0.5,title:{text:'Tuna servings removed',textStyle:style},textStyle:style,majorGridlines:{fill:C.light,width:1}},
        chartFill:C.bg,plotAreaFill:C.bg
      });
    } else if(d.kind==='references_short') {
      lines(s,[
        '[R1] Course handout, 26 October 2026: matrix primal simplex',
        '[R2] Matoušek & Gärtner, 2007: Understanding and Using LP',
        '[R3–R4] National Park Service & American Hiking Society: essentials',
        '[R5–R6] REI: general pack-weight and backpack-fit guidance',
        '[R7–R8] Mission & StarKist: the exact food-label coefficients',
        '[R9–R10] Walsh et al., 2018 & Vickery-Howe et al., 2024: load studies'
      ],64,180,1152,28,67);
    } else if(d.kind==='future') {
      text(s,'Next mathematical milestones',64,180,560,65,34,C.accent,true);
      text(s,'Measured masses and packed volume\nMore foods and infeasible scenarios\nWhole equipment as integer decisions\nShared gear and fair group allocation',64,275,560,260,30);
      text(s,'Website direction',680,180,536,65,34,C.accent,true);
      text(s,'Trip details and available inventory\nPacking list with source assumptions\nCapacity margins and binding constraints\nClear explanations of infeasibility',680,275,536,260,30);
      text(s,'Current milestone: a small, explainable LP with a complete simplex solution',64,567,1152,55,29,C.muted);
    } else if(d.kind==='matrix') {
      text(s,'x = (yT, yU, sE, sP, sT, sU)',64,165,1152,60,34,C.accent,true);
      table(s,[['A','yT','yU','sE','sP','sT','sU','b'],['Energy','140','70','1','0','0','0','350'],['Protein','4','17','0','1','0','0','25'],['T inventory','1','0','0','0','1','0','6'],['U inventory','0','1','0','0','0','1','2']],260,290,[230,125,125,125,125,125,125,172],25);
      text(s,'c = (50, 74, 0, 0, 0, 0). Initial B = I4.',64,580,1152,55,32);
    } else if(d.kind==='dual') {
      text(s,'ΔzN = −(B^-1 N)^T e_i       s = z_j / Δz_j',64,165,1152,70,34,C.accent,true);
      table(s,[['Pivot','Pre-exchange N','ΔzN','Dual step s'],['1','(yT, yU)','(−4, −17)','74/17'],['2','(yT, sP)','(−2100/17, 70/17)','277/1050']],285,230,[160,280,440,272],27);
      text(s,'Final nonbasic costs: z_sE = 277/1050,  z_sP = 49/15',64,565,1152,60,31);
    } else if(d.kind==='certificate') {
      text(s,'λE = 277/1050       λP = 49/15       both ≥ 0',64,175,1152,70,36,C.accent,true);
      lines(s,['140λE + 4λP = 50','70λE + 17λP = 74','Every feasible ration has M ≥ 630λE + 33λP = 274 g.'],64,290,1152,32,80);
      text(s,'Our feasible ration attains 274 g, proving global optimality.',64,565,1152,65,34,C.ink,true);
    } else if(d.kind==='kit') {
      table(s,[['Fixed group','g','Fixed group','g'],['Empty pack','650','Shelter + whistle','120'],['Navigation + backup power','300','Sun protection','80'],['Warm layer + rain shell','450','Repair / fire / waste','80'],['Headlamp + batteries','100','Water containers','150'],['First aid + medications','150','Emergency food','200'],['Food packaging','20','TOTAL','2300']],175,390,[430,100,490,132],25);
      text(s,'All masses are assumptions. Water contents add 2500 g separately.',64,590,1152,50,28,C.muted);
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

// Optional standalone rebuild. In Codex the same builder is called in the live session.
if(typeof process !== 'undefined' && process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const {Presentation,PresentationFile}=await import('@oai/artifact-tool');
  const p=Presentation.create({slideSize:{width:1280,height:720}});
  await build(p);
  const out=path.join(root,'presentations/milestone-01');
  await (await PresentationFile.exportPptx(p)).save(path.join(out,'TrailBalance-Milestone-01.pptx'));
  console.log('PowerPoint saved. Use LibreOffice or PowerPoint to export a PDF.');
}
