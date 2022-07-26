'reinit'

iv=1 ; ivmax=1
while(iv<=ivmax)
if(iv=1) ; ivar='sst' ; endif

in=1 ; inmax=2
while(in<=inmax)
if(in=1) ; iname='ERSST' ; endif
if(in=2) ; iname='CESM_FOSI' ; endif

ic=1 ; icmax=3
while(ic<=icmax)
if(ic=1) ; icame='nino3' ; endif
if(ic=2) ; icame='nino34' ; endif
if(ic=3) ; icame='nino4' ; endif

'reinit'
'open ../DAIO/sst.ano.detrend.'iname'.ctl'
*if(in=1) ; 'xdfopen /archive/hgl/data/ersst/ersst.v5.merge.197001-202004.remapbil.nc.ctl' ; endif
*if(in=2) ; 'xdfopen /archive/hgl/FEISTY/CESM-FOSI/sst.remap.nc.ctl' ; endif

'set x 1' ; 'set y 1'
'set time jan1981 dec2015'

if(ic=1) ; 'define a1=aave(sst,lon=210,lon=270,lat=-5,lat=5)' ; endif
if(ic=2) ; 'define a1=aave(sst,lon=190,lon=240,lat=-5,lat=5)' ; endif
if(ic=3) ; 'define a1=aave(sst,lon=160,lon=210,lat=-5,lat=5)' ; endif


'set gxout fwrite'
'set fwrite ../DAIO/'icame'.'iname'.gdat'
'd a1'
'disable fwrite'

fn1='../DAIO/'icame'.'iname'.ctl'
fn=write(fn1,'Dset ^'icame'.'iname'.gdat')
fn=write(fn1,'title chl 5-20N;25-5m ave ')
fn=write(fn1,'Undef -9.99E+08')
fn=write(fn1,'Xdef 1 linear 0 1')
fn=write(fn1,'Ydef 1 linear -89.5 1')
fn=write(fn1,'Zdef 1 linear 0 1')
*fn=write(fn1,'Tdef 272 linear sep1997 1mo')
fn=write(fn1,'Tdef 420 linear jan1981 1mo')
fn=write(fn1,'Vars 1')
fn=write(fn1,''ivar'=>'ivar' 1 t,y,x 'ivar)
fn=write(fn1,'Endvars')

ic=ic+1
endwhile

in=in+1
endwhile

iv=iv+1
endwhile
