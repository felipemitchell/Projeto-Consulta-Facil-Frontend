import { chromium } from 'playwright'
import fs from 'fs'
const b = await chromium.launch(); 
const ctx = await b.newContext({ viewport:{width:360,height:740}, acceptDownloads:true, locale:'pt-BR' })
const p = await ctx.newPage()
const api='https://back-end-pi-ihs1.onrender.com'
const J=(o,s=200)=>({status:s,contentType:'application/json',body:JSON.stringify(o)})
await p.route(api+'/**', r=>{
  const u=r.request().url().replace(api,''), m=r.request().method()
  if(u.startsWith('/auth/login')) return r.fulfill(J({token:'t',usuario:{id:1,nome:'Administrador Sistema',email:'a@a',perfil:'ADMIN'}}))
  if(u.startsWith('/agendamentos')) return r.fulfill(J([{id:5,id_paciente:1,id_disponibilidade:1,status:'CONFIRMADO',data_consulta:'2026-10-22',hora_consulta:'20:00:00'}]))
  if(u.startsWith('/disponibilidades')) return r.fulfill(J([{id_disponibilidade:1,id_profissional:1,data_disponivel:'2026-10-22',hora_inicio:'20:00:00'}]))
  if(u.startsWith('/pacientes')) return r.fulfill(J([{id_paciente:1,nome:'Lucas Ferreira'}]))
  if(u.startsWith('/profissionais')) return r.fulfill(J([{id_profissional:1,nome:'Dr. Kennedy'}]))
  return r.fulfill(J([]))
})
await p.goto('http://localhost:5199/'); 
await p.getByText('Entrar',{exact:false}).first().click().catch(()=>{})
await p.fill('input[type=email]','a@a'); await p.fill('input[type=password]','x')
await p.keyboard.press('Enter'); await p.waitForTimeout(1500)
await p.screenshot({path:'/tmp/admin.png'})
await p.click('.admin-relatorios'); await p.waitForTimeout(300)
const [d]=await Promise.all([p.waitForEvent('download'),p.click('.admin-baixar')])
await d.saveAs('/tmp/rel.xlsx'); console.log('arquivo',d.suggestedFilename())
await p.getByText('Clínicas').last().click().catch(()=>{}); await p.waitForTimeout(800)
await p.screenshot({path:'/tmp/clin.png'})
const bb=await p.locator('.clinicas-novo').boundingBox(); console.log('fab',bb)
await b.close()
