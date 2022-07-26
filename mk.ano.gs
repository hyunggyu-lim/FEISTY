*'reinit'

iv=2 ; ivmax=7
while(iv<=ivmax)
if(iv=1) ; ivar='sst' ; endif
if(iv=2) ; ivar='temp_150m' ; endif
if(iv=3) ; ivar='temp_bottom' ; endif
if(iv=4) ; ivar='poc_flux_in_bottom' ; endif
if(iv=5) ; ivar='LzooC_150m' ; endif
if(iv=6) ; ivar='Lzoo_loss_150m' ; endif
if(iv=7) ; ivar='fracL' ; endif
*if(iv=8) ; ivar='diatC_150m' ; endif

in=2 ; inmax=2
while(in<=inmax)
if(in=1) ; iname='ERSST' ; endif
if(in=2) ; iname='CESM_FOSI' ; endif

'reinit'
if(in=1) ; 'sdfopen /archive/hgl/data/ersst/sst.mnmean.remapbil.nc' ; endif
*if(in=1) ; 'xdfopen /archive/hgl/data/ersst/ersst.v5.merge.197001-202004.remapbil.nc.ctl' ; endif
*if(in=2) ; 'xdfopen /archive/hgl/FEISTY/CESM-FOSI/'ivar'.remap.nc.ctl' ; endif
if(in=2)
if(iv=1) ; 'xdfopen /archive/hgl/FEISTY/CESM-FOSI/'ivar'.remap.nc.ctl' ; endif
if(iv>=2) ; 'xdfopen /archive/hgl/FEISTY/CESM-FOSI/g.e11_LENS.GECOIAF.T62_g16.009.FEISTY_forcing_complete.ncatted.remap.nc.ctl' ; endif
endif

'set x 1 360' ; 'set y 1 180'
'set time jan1981 dec1981'
ivar2=ivar
if(iv=4) ; ivar2='poc_flux_in_bot' ; endif
'define clim1=ave('ivar2',t+0,time=dec2015,12)'
'modify clim1 seasonal'
'set time jan1981 dec2015'
'define m1='ivar2'-clim1'
'ltrend m1 a b r'
'define m2=m1-a'

'set gxout fwrite'
'set fwrite ../DAIO/'ivar2'.ano.detrend.'iname'.gdat'
'd m2'
'disable fwrite'

fn1='../DAIO/'ivar2'.ano.detrend.'iname'.ctl'
fn=write(fn1,'Dset ^'ivar2'.ano.detrend.'iname'.gdat')
fn=write(fn1,'title chl 5-20N;25-5m ave ')
fn=write(fn1,'Undef -9.99E+08')
fn=write(fn1,'Xdef 360 linear 0 1')
fn=write(fn1,'Ydef 180 linear -89.5 1')
fn=write(fn1,'Zdef 1 linear 0 1')
*fn=write(fn1,'Tdef 272 linear sep1997 1mo')
fn=write(fn1,'Tdef 420 linear jan1981 1mo')
fn=write(fn1,'Vars 1')
fn=write(fn1,''ivar2'=>'ivar2' 1 t,y,x 'ivar2)
fn=write(fn1,'Endvars')

in=in+1
endwhile

iv=iv+1
endwhile
