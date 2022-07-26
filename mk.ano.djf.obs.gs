'reinit'


iv=1 ; ivmax=1
while(iv<=ivmax)
if(iv=1) ; ivar='sst' ; endif
if(iv=2) ; ivar='temp_150m' ; endif
if(iv=3) ; ivar='temp_bottom' ; endif
if(iv=4) ; ivar='poc_flux_in_bot' ; endif
if(iv=5) ; ivar='LzooC_150m' ; endif
if(iv=6) ; ivar='Lzoo_loss_150m' ; endif
if(iv=7) ; ivar='fracL' ; endif
*iv=5 ; ivmax=8
*while(iv<=ivmax)
*if(iv=1) ; ivar='sst' ; endif
*if(iv=2) ; ivar='temp_150m' ; endif
*if(iv=3) ; ivar='temp_bottom' ; endif
*if(iv=4) ; ivar='poc_flux_in_bottom' ; endif
*if(iv=5) ; ivar='spC_150m' ; endif
*if(iv=6) ; ivar='zooC_150m' ; endif
*if(iv=7) ; ivar='zoo_loss_150m' ; endif
*if(iv=8) ; ivar='diatC_150m' ; endif

in=1 ; inmax=1
while(in<=inmax)
if(in=1) ; iname='ERSST' ; endif
if(in=2) ; iname='CESM_FOSI' ; endif

'reinit'
ivar2=ivar
if(iv=4) ; ivar2='poc_flux_in_bot' ; endif
'open ../DAIO/'ivar2'.ano.detrend.'iname'.ctl'
'set x 1 360' ; 'set y 1 180'
'set gxout fwrite'
'set fwrite ../DAIO/'ivar2'.ano.detrend.'iname'.djf.gdat'
it=1982 ; itmax=2015
while(it<=itmax)
'set time jan'it
'd ave('ivar2',t-1,t+1)'
it=it+1
endwhile
'disable fwrite'

fn1='../DAIO/'ivar2'.ano.detrend.'iname'.djf.ctl'
fn=write(fn1,'Dset ^'ivar2'.ano.detrend.'iname'.djf.gdat')
fn=write(fn1,'title chl 5-20N;25-5m ave ')
fn=write(fn1,'Undef -9.99E+08')
fn=write(fn1,'Xdef 360 linear 0 1')
fn=write(fn1,'Ydef 180 linear -89.5 1')
fn=write(fn1,'Zdef 1 linear 0 1')
*fn=write(fn1,'Tdef 272 linear sep1997 1mo')
fn=write(fn1,'Tdef 34 linear jan1982 1yr')
fn=write(fn1,'Vars 1')
fn=write(fn1,''ivar2'=>'ivar2' 1 t,y,x 'ivar)
fn=write(fn1,'Endvars')

in=in+1
endwhile

iv=iv+1
endwhile
