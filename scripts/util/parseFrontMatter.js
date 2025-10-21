function parseFrontMatter(md){
  const m=/^---\n([\s\S]*?)\n---\n([\s\S]*)$/m.exec(md)||[];
  const fm=(m[1]||"").split("\n").reduce((acc,line)=>{
    const i=line.indexOf(":");
    if(i>0){ const k=line.slice(0,i).trim(); let v=line.slice(i+1).trim();
      if(/^".*"$/.test(v)) v=v.slice(1,-1);
      if(/^\[.*\]$/.test(v)){ try{ v=JSON.parse(v.replace(/'/g,'"')) }catch{} }
      acc[k]=v;
    }
    return acc;
  },{});
  return {frontmatter:fm, body:(m[2]||"").trim()};
}

module.exports = { parseFrontMatter };
