const blackList = [
  '@claimab.com',
  '@businesssource.net',
  '@5-mail.info',
  '@mailsearch.net',
  '@mailprotech.com',
  '@mail-apps.com',
  '@mail.bccto.me',
  '@braun4email.com',
  '@linshiyouxiang.net',
  '@utooemail.com',
  '@next2cloud.info',
  '@alexbox.online',
  '@prmail.top',
  '@www.bccto.me',
  '@grr.la',
  '@nbzmr.com',
  '@0815.ru',
  '@080mail.com',
  '@0815.su',
  '@0clickemail.com',
  '@0-mail.com',
  '@0wnd.net',
  '@10mail.com',
  '@10mail.org',
  '@10minut.com.pl',
  '@10minutemail.cf',
  '@10minutemail.co.za',
  '@10minutemail.com',
  '@10minutemail.de',
  '@10minutemail.ga',
  '@10minutemail.gq',
  '@10minutemail.ml',
  '@10minutemail.net',
  '@10minutesmail.com',
  '@10x9.com',
  '@123-m.com',
  '@12houremail.com',
  '@12minutemail.com',
  '@1chuan.com',
  '@1pad.de',
  '@1s.fr',
  '@1shivom.com',
  '@1zhuan.com',
  '@20email.eu',
  '@20mail.in',
  '@20mail.it',
  '@20minutemail.com',
  '@2120001.net',
  '@21cn.com',
  '@24hourmail.com',
  '@2prong.com',
  '@30minutemail.com',
  '@30wave.com',
  '@3202.com',
  '@33mail.com',
  '@36ru.com',
  '@3d-painting.com',
  '@3l6.com',
  '@3mail.ga',
  '@418.dk',
  '@42o.org',
  '@4mail.cf',
  '@4mail.ga',
  '@4warding.com',
  '@4warding.net',
  '@5gramos.com',
  '@5mail.cf',
  '@5mail.ga',
  '@5oz.ru',
  '@5x25.com',
  '@60minutemail.com',
  '@675hosting.com',
  '@6mail.ml',
  '@6paq.com',
  '@6url.com',
  '@7mail.ml',
  '@7tags.com',
  '@80665.com',
  '@99experts.com',
  '@9mail.cf',
  '@9ox.net',
  '@a45.in',
  '@abakiss.com',
  '@a-bc.net',
  '@abuser.eu',
  '@abyssmail.com',
  '@academiccommunity.com',
  '@acentri.com',
  '@adiq.eu',
  '@adsd.org',
  '@advantimo.com',
  '@adwaterandstir.com',
  '@aegia.net',
  '@aegiscorp.net',
  '@afrobacon.com',
  '@agtx.net',
  '@ahk.jp',
  '@airsi.de',
  '@akapost.com',
  '@akerd.com',
  '@aligamel.com',
  '@alisongamel.com',
  '@alivance.com',
  '@alldirectbuy.com',
  '@allowed.org',
  '@alph.wtf',
  '@amail.com',
  '@ama-trade.de',
  '@ama-trans.de',
  '@amazon-aws.org',
  '@amelabs.com',
  '@amilegit.com',
  '@amiri.net',
  '@ampsylike.com',
  '@anappfor.com',
  '@anappthat.com',
  '@animesos.com',
  '@ano-mail.net',
  '@anonbox.net',
  '@anon-mail.de',
  '@anonmails.de',
  '@anonymail.dk',
  '@anonymbox.com',
  '@anonymousness.com',
  '@anthony-junkmail.com',
  '@antireg.com',
  '@antireg.ru',
  '@antispam.de',
  '@antispam24.de',
  '@apfelkorps.de',
  '@aphlog.com',
  '@apkmd.com',
  '@appc.se',
  '@appinventor.nl',
  '@appixie.com',
  '@apps.dj',
  '@arduino.hk',
  '@armyspy.com',
  '@arvato-community.de',
  '@asdasd.nl',
  '@asdasd.ru',
  '@ashleyandrew.com',
  '@asu.mx',
  '@asu.su',
  '@augmentationtechnology.com',
  '@auoie.com',
  '@auti.st',
  '@autorobotica.com',
  '@autotwollow.com',
  '@aver.com',
  '@awatum.de',
  '@awiki.org',
  '@awsoo.com',
  '@axiz.org',
  '@azcomputerworks.com',
  '@badgerland.eu',
  '@badoop.com',
  '@bareed.ws',
  '@barryogorman.com',
  '@basscode.org',
  '@bauwerke-online.com',
  '@bccto.com',
  '@www.bccto.com',
  '@m.bccto.com',
  '@bccto.me',
  '@www.bccto.me',
  '@m.bccto.me',
  '@4057.com',
  '@zhaohishu.com',
  '@a7996.com',
  '@chaichuang.com',
  '@dawin.com',
  '@cuirushi.org',
  '@mdu.edu.rs',
  '@cr219.com',
  '@juyouxi.com',
  '@jnpayy.com',
  '@dongqing365.com',
  '@1766258.com',
  '@mail.jpgames.net',
  '@zhaoyuanedu.cn',
  '@zymuying.com',
  '@oiizz.com',
  '@jiaxin8736.com',
  '@mail.libivan.com',
  '@vip.bccto.me',
  '@bearsarefuzzy.com',
  '@beddly.com',
  '@beefmilk.com',
  '@bestvpn.top',
  '@bigstring.com',
  '@bij.pl',
  '@binkmail.com',
  '@bio-muesli.net',
  '@bladesmail.net',
  '@blogos.net',
  '@bluewerks.com',
  '@bnuis.com',
  '@bofthew.com',
  '@bootybay.de',
  '@borged.com',
  '@bouncr.com',
  '@boxformail.in',
  '@boximail.com',
  '@boxtemp.com.br',
  '@brasx.org',
  '@breakthru.com',
  '@brefmail.com',
  '@brennendesreich.de',
  '@broadbandninja.com',
  '@bsnow.net',
  '@bspamfree.org',
  '@bst-72.com',
  '@btc.email',
  '@btizet.pl',
  '@bugmenever.com',
  '@bugmenot.com',
  '@bulrushpress.com',
  '@bum.net',
  '@bumpymail.com',
  '@bunchofidiots.com',
  '@bunsenhoneydew.com',
  '@businessbackend.com',
  '@businesssuccessislifesuccess.com',
  '@buspad.org',
  '@buymoreplays.com',
  '@byebyemail.com',
  '@byom.de',
  '@cachedot.net',
  '@cam4you.cc',
  '@casualdx.com',
  '@cavi.mx',
  '@cbair.com',
  '@cbes.net',
  '@cdpa.cc',
  '@ceed.se',
  '@cek.pm',
  '@cellurl.com',
  '@centermail.com',
  '@centermail.net',
  '@chacuo.net',
  '@cheatmail.de',
  '@chickenkiller.com',
  '@chielo.com',
  '@chilkat.com',
  '@choicemail1.com',
  '@chong-mail.com',
  '@chong-mail.net',
  '@chumpstakingdumps.com',
  '@cigar-auctions.com',
  '@civx.org',
  '@ckiso.com',
  '@clandest.in',
  '@clipmail.eu',
  '@clixser.com',
  '@clrmail.com',
  '@cmail.com',
  '@cmail.net',
  '@cmail.org',
  '@cnamed.com',
  '@cnew.ir',
  '@cnmsg.net',
  '@co.cc',
  '@cocovpn.com',
  '@codivide.com',
  '@coieo.com',
  '@completegolfswing.com',
  '@comwest.de',
  '@consumerriot.com',
  '@coolimpool.org',
  '@courrieltemporaire.com',
  '@crapmail.org',
  '@crastination.de',
  '@crazymailing.com',
  '@crossroadsmail.com',
  '@cubiclink.com',
  '@curryworld.de',
  '@cust.in',
  '@cuvox.de',
  '@cylab.org',
  '@d3p.dk',
  '@dacoolest.com',
  '@daemsteam.com',
  '@daintly.com',
  '@dammexe.net',
  '@dandikmail.com',
  '@daryxfox.net',
  '@dataarca.com',
  '@datazo.ca',
  '@davidkoh.net',
  '@dayrep.com',
  '@dbunker.com',
  '@dcemail.com',
  '@ddcrew.com',
  '@de-a.org',
  '@deadaddress.com',
  '@deadfake.cf',
  '@deadspam.com',
  '@deagot.com',
  '@dealja.com',
  '@defomail.com',
  '@degradedfun.net',
  '@delayload.com',
  '@delayload.net',
  '@derkombi.de',
  '@der-kombi.de',
  '@derluxuswagen.de',
  '@despammed.com',
  '@devnullmail.com',
  '@deyom.com',
  '@dialogus.com',
  '@diapaulpainting.com',
  '@digitalmariachis.com',
  '@digitalsanctuary.com',
  '@dildosfromspace.com',
  '@dingbone.com',
  '@disbox.net',
  '@discard.cf',
  '@discard.email',
  '@discard.ga',
  '@discard.gq',
  '@discard.ml',
  '@discardmail.com',
  '@discardmail.de',
  '@dispomail.eu',
  '@disposable.cf',
  '@disposableaddress.com',
  '@disposableemailaddresses.com',
  '@disposableinbox.com',
  '@dispose.it',
  '@disposeamail.com',
  '@disposemail.com',
  '@dispostable.com',
  '@divermail.com',
  '@divismail.ru',
  '@dlemail.ru',
  '@dob.jp',
  '@dodgeit.com',
  '@dodgemail.de',
  '@dodgit.com',
  '@dodgit.org',
  '@dodsi.com',
  '@doiea.com',
  '@dolphinnet.net',
  '@domforfb9.tk',
  '@domozmail.com',
  '@donemail.ru',
  '@dontreg.com',
  '@dontsendmespam.de',
  '@doquier.tk',
  '@dotman.de',
  '@dotmsg.com',
  '@dp76.com',
  '@dr69.site',
  '@drdrb.com',
  '@drdrb.net',
  '@dred.ru',
  '@drevo.si',
  '@drivetagdev.com',
  '@dropcake.de',
  '@droplar.com',
  '@dsiay.com',
  '@dspwebservices.com',
  '@duam.net',
  '@dudmail.com',
  '@duk33.com',
  '@dumpandjunk.com',
  '@dumpmail.de',
  '@dumpyemail.com',
  '@durandinterstellar.com',
  '@duskmail.com',
  '@dz17.net',
  '@e3z.de',
  '@e4ward.com',
  '@easytrashmail.com',
  '@easy-trash-mail.com',
  '@ebeschlussbuch.de',
  '@edgex.ru',
  '@edu.sg',
  '@eelmail.com',
  '@efxs.ca',
  '@einmalmail.de',
  '@einrot.com',
  '@eintagsmail.de',
  '@e-mail.com',
  '@email.net',
  '@e-mail.org',
  '@email60.com',
  '@emailage.cf',
  '@emaildienst.de',
  '@email-fake.cf',
  '@email-fake.ga',
  '@email-fake.gq',
  '@email-fake.ml',
  '@emailgo.de',
  '@emailias.com',
  '@emailigo.de',
  '@emailinfive.com',
  '@emailisvalid.com',
  '@email-jetable.fr',
  '@emaillime.com',
  '@emailmiser.com',
  '@emailresort.com',
  '@emails.ga',
  '@emailsensei.com',
  '@emailsingularity.net',
  '@emailspam.cf',
  '@emailspam.ml',
  '@emailtemporanea.com',
  '@emailtemporanea.net',
  '@emailtemporario.com.br',
  '@emailthe.net',
  '@emailtmp.com',
  '@emailto.de',
  '@emailwarden.com',
  '@emailxfer.com',
  '@emailz.cf',
  '@emailz.gq',
  '@emailz.ml',
  '@emeil.in',
  '@emeil.ir',
  '@emil.com',
  '@emz.net',
  '@enterto.com',
  '@ephemail.net',
  '@ephemeral.email',
  '@ero-tube.org',
  '@esemay.com',
  '@esprity.com',
  '@euaqa.com',
  '@evopo.com',
  '@example.com',
  '@exitstageleft.net',
  '@explodemail.com',
  '@extremail.ru',
  '@eyepaste.com',
  '@ez.lv',
  '@ezfill.com',
  '@ezstest.com',
  '@f4k.es',
  '@fadingemail.com',
  '@faithkills.com',
  '@fakedemail.com',
  '@fakeinbox.com',
  '@fakeinformation.com',
  '@fake-mail.cf',
  '@fakemail.fr',
  '@fake-mail.ga',
  '@fakemailgenerator.com',
  '@fakemailz.com',
  '@fammix.com',
  '@fangoh.com',
  '@fantasymail.de',
  '@fastacura.com',
  '@fastchevy.com',
  '@fastchrysler.com',
  '@fastkawasaki.com',
  '@fastmazda.com',
  '@fastmitsubishi.com',
  '@fastnissan.com',
  '@fastsubaru.com',
  '@fastsuzuki.com',
  '@fasttoyota.com',
  '@fastyamaha.com',
  '@fatflap.com',
  '@fettometern.com',
  '@fictionsite.com',
  '@fightallspam.com',
  '@figjs.com',
  '@figshot.com',
  '@filzmail.com',
  '@findu.pl',
  '@fir.hk',
  '@fivemail.de',
  '@fizmail.com',
  '@fleckens.hu',
  '@flemail.ru',
  '@flowu.com',
  '@flurred.com',
  '@flyinggeek.net',
  '@flyspam.com',
  '@foobarbot.net',
  '@footard.com',
  '@forecastertests.com',
  '@forgetmail.com',
  '@fornow.eu',
  '@forspam.net',
  '@foxja.com',
  '@fr.nf',
  '@fr.nf',
  '@frapmail.com',
  '@freecat.net',
  '@free-email.cf',
  '@freemails.ga',
  '@freemails.ml',
  '@freeplumpervideos.com',
  '@freesistercam.com',
  '@freundin.ru',
  '@front14.org',
  '@ftp.sh',
  '@ftpinc.ca',
  '@fuckedupload.com',
  '@fudgerub.com',
  '@fuirio.com',
  '@fulvie.com',
  '@fun64.com',
  '@furzauflunge.de',
  '@fxnxs.com',
  '@fyii.de',
  '@gaggle.net',
  '@galaxy.tv',
  '@gally.jp',
  '@garbagemail.org',
  '@gardenscape.ca',
  '@garizo.com',
  '@garliclife.com',
  '@garrymccooey.com',
  '@gav0.com',
  '@gawab.com',
  '@geew.ru',
  '@gelitik.in',
  '@genderfuck.net',
  '@get1mail.com',
  '@get2mail.fr',
  '@getairmail.com',
  '@geteit.com',
  '@get-mail.ml',
  '@getmails.eu',
  '@getonemail.com',
  '@getonemail.net',
  '@ghosttexter.de',
  '@giantmail.de',
  '@ginzi.net',
  '@ginzy.eu',
  '@gishpuppy.com',
  '@glucosegrin.com',
  '@gmal.com',
  '@gmial.com',
  '@go2vpn.net',
  '@goemailgo.com',
  '@gomail.in',
  '@gorillaswithdirtyarmpits.com',
  '@gotmail.com',
  '@gotmail.net',
  '@gotmail.org',
  '@gowikitv.com',
  '@grandmamail.com',
  '@grandmasmail.com',
  '@greensloth.com',
  '@greggamel.com',
  '@greggamel.net',
  '@gregorygamel.com',
  '@gregorygamel.net',
  '@grish.de',
  '@grn.cc',
  '@gudanglowongan.com',
  '@guerillamail.com',
  '@guerillamail.de',
  '@guerillamail.net',
  '@guerillamail.org',
  '@guerillamailblock.com',
  '@guerrillamail.com',
  '@guerrillamail.de',
  '@guerrillamail.net',
  '@guerrillamail.org',
  '@guerrillamailblock.com',
  '@gustr.com',
  '@gynzy.es',
  '@gynzy.eu',
  '@gynzy.gr',
  '@gynzy.lt',
  '@gynzy.pl',
  '@h8s.org',
  '@habitue.net',
  '@hacccc.com',
  '@haltospam.com',
  '@harakirimail.com',
  '@haribu.com',
  '@hartbot.de',
  '@headstrong.de',
  '@heathenhammer.com',
  '@hecat.es',
  '@herp.in',
  '@herpderp.nl',
  '@hi5.si',
  '@hiddentragedy.com',
  '@hidemail.de',
  '@hidzz.com',
  '@hmamail.com',
  '@hoanggiaanh.com',
  '@hochsitze.com',
  '@hotmai.com',
  '@hotmial.com',
  '@hotpop.com',
  '@housat.com',
  '@hpc.tw',
  '@hs.vc',
  '@ht.cx',
  '@hulapla.de',
  '@humaility.com',
  '@hungpackage.com',
  '@hvastudiesucces.nl',
  '@iaoss.com',
  '@ibnuh.bz',
  '@icx.in',
  '@ieh-mail.de',
  '@ige.es',
  '@ignoremail.com',
  '@iheartspam.org',
  '@ikbenspamvrij.nl',
  '@ilovespam.com',
  '@imgof.com',
  '@imgv.de',
  '@imstations.com',
  '@inbax.tk',
  '@inbound.plus',
  '@inbox.si',
  '@inboxalias.com',
  '@inboxclean.com',
  '@inboxclean.org',
  '@inboxproxy.com',
  '@inclusiveprogress.com',
  '@incognitomail.com',
  '@incognitomail.net',
  '@incognitomail.org',
  '@incq.com',
  '@ind.st',
  '@inggo.org',
  '@inoutmail.de',
  '@insanumingeniumhomebrew.com',
  '@instantemailaddress.com',
  '@instant-mail.de',
  '@internetoftags.com',
  '@interstats.org',
  '@intersteller.com',
  '@iozak.com',
  '@ipoo.org',
  '@ipsur.org',
  '@irish2me.com',
  '@irishspringrealty.com',
  '@iroid.com',
  '@ironiebehindert.de',
  '@itoup.com',
  '@iwi.net',
  '@ixx.io',
  '@jafps.com',
  '@jdmadventures.com',
  '@jellyrolls.com',
  '@jetable.com',
  '@jetable.net',
  '@jnxjn.com',
  '@jobposts.net',
  '@jobs-to-be-done.net',
  '@joelpet.com',
  '@joetestalot.com',
  '@jopho.com',
  '@jourrapide.com',
  '@jpco.org',
  '@jsrsolutions.com',
  '@jwork.ru',
  '@kakadua.net',
  '@kaovo.com',
  '@kariplan.com',
  '@kasmail.com',
  '@kaspop.com',
  '@kcrw.de',
  '@keepmymail.com',
  '@keipino.de',
  '@kennedy808.com',
  '@kiani.com',
  '@killmail.com',
  '@killmail.net',
  '@kiois.com',
  '@klassmaster.com',
  '@kloap.com',
  '@kludgemush.com',
  '@klzlk.com',
  '@kmhow.com',
  '@kon42.com',
  '@kook.ml',
  '@kopagas.com',
  '@kosmetik-obatkuat.com',
  '@kostenlosemailadresse.de',
  '@koszmail.pl',
  '@krypton.tk',
  '@kurzepost.de',
  '@kwift.net',
  '@kwilco.net',
  '@kyal.pl',
  '@lackmail.net',
  '@lackmail.ru',
  '@lakelivingstonrealestate.com',
  '@laoeq.com',
  '@lastmail.com',
  '@lawlita.com',
  '@lazyinbox.com',
  '@ldop.com',
  '@ldtp.com',
  '@lee.mx',
  '@leeching.net',
  '@letmeinonthis.com',
  '@letthemeatspam.com',
  '@lez.se',
  '@lhsdv.com',
  '@lifebyfood.com',
  '@lifetotech.com',
  '@ligsb.com',
  '@link2mail.net',
  '@litedrop.com',
  '@lkgn.se',
  '@llogin.ru',
  '@logular.com',
  '@loin.in',
  '@lolfreak.net',
  '@lookugly.com',
  '@lortemail.dk',
  '@losemymail.com',
  '@lovemeleaveme.com',
  '@lr78.com',
  '@lroid.com',
  '@luckymail.org',
  '@lukecarriere.com',
  '@lukop.dk',
  '@m21.cc',
  '@maboard.com',
  '@magamail.com',
  '@mail.by',
  '@mail114.net',
  '@mail1a.de',
  '@mail2rss.org',
  '@mail333.com',
  '@mail4trash.com',
  '@mail666.ru',
  '@mail707.com',
  '@mail72.com',
  '@mailback.com',
  '@mailbidon.com',
  '@mailblocks.com',
  '@mailbucket.org',
  '@mailcatch.com',
  '@mailchop.com',
  '@mailcker.com',
  '@mailde.de',
  '@maildrop.cc',
  '@maildrop.cf',
  '@maildrop.ml',
  '@maildu.de',
  '@maildx.com',
  '@maileater.com',
  '@mailed.in',
  '@maileimer.de',
  '@maileme101.com',
  '@mailexpire.com',
  '@mailfa.tk',
  '@mail-filter.com',
  '@mailforspam.com',
  '@mailfree.gq',
  '@mailfree.ml',
  '@mailfreeonline.com',
  '@mailfs.com',
  '@mailhazard.com',
  '@mailimate.com',
  '@mailin8r.com',
  '@mailinatar.com',
  '@mailinater.com',
  '@mailinator.com',
  '@mailinator.net',
  '@mailinator.org',
  '@mailinator2.com',
  '@mailincubator.com',
  '@mailismagic.com',
  '@mailjunk.gq',
  '@mailmate.com',
  '@mailme.gq',
  '@mailme.ir',
  '@mailme.lv',
  '@mailme24.com',
  '@mailmetrash.com',
  '@mailmoat.com',
  '@mailms.com',
  '@mailnator.com',
  '@mailnesia.com',
  '@mailnull.com',
  '@mailorg.org',
  '@mailproxsy.com',
  '@mailquack.com',
  '@mailsac.com',
  '@mailscrap.com',
  '@mailseal.de',
  '@mailshell.com',
  '@mailsiphon.com',
  '@mailslapping.com',
  '@mailslite.com',
  '@mailtemporaire.com',
  '@mail-temporaire.com',
  '@mailtemporaire.fr',
  '@mail-temporaire.fr',
  '@mailtome.de',
  '@mailtothis.com',
  '@mailtrash.net',
  '@mailtv.net',
  '@mailtv.tv',
  '@mailzi.ru',
  '@mailzilla.com',
  '@mailzilla.org',
  '@makemetheking.com',
  '@malahov.de',
  '@malayalamdtp.com',
  '@manifestgenerator.com',
  '@mansiondev.com',
  '@manybrain.com',
  '@markmurfin.com',
  '@matchpol.net',
  '@mbx.cc',
  '@mcache.net',
  '@mciek.com',
  '@meinspamschutz.de',
  '@meltmail.com',
  '@messagebeamer.de',
  '@mezimages.net',
  '@mfsa.ru',
  '@miaferrari.com',
  '@midcoastcustoms.com',
  '@midcoastcustoms.net',
  '@midcoastsolutions.com',
  '@midcoastsolutions.net',
  '@midlertidig.com',
  '@midlertidig.net',
  '@midlertidig.org',
  '@mierdamail.com',
  '@migmail.net',
  '@migmail.pl',
  '@migumail.com',
  '@mijnhva.nl',
  '@ministry-of-silly-walks.de',
  '@minsmail.com',
  '@mintemail.com',
  '@misterpinball.de',
  '@mkpfilm.com',
  '@ml8.ca',
  '@mm5.se',
  '@moakt.com',
  '@moburl.com',
  '@mockmyid.com',
  '@moeri.org',
  '@mohmal.com',
  '@molms.com',
  '@momentics.ru',
  '@moneypipe.net',
  '@monumentmail.com',
  '@moonwake.com',
  '@moot.es',
  '@moreawesomethanyou.com',
  '@moreorcs.com',
  '@motique.de',
  '@mountainregionallibrary.net',
  '@moza.pl',
  '@msgos.com',
  '@msk.ru',
  '@mspeciosa.com',
  '@msxd.com',
  '@mt2009.com',
  '@mt2014.com',
  '@mt2015.com',
  '@mtmdev.com',
  '@muathegame.com',
  '@muchomail.com',
  '@mucincanon.com',
  '@mvrht.com',
  '@mvrht.net',
  '@mwarner.org',
  '@mxfuel.com',
  '@my10minutemail.com',
  '@mybitti.de',
  '@mycleaninbox.net',
  '@mycorneroftheinter.net',
  '@mydemo.equipment',
  '@myemailboxy.com',
  '@mymail-in.net',
  '@mynetstore.de',
  '@mypacks.net',
  '@mypartyclip.de',
  '@myphantomemail.com',
  '@mysamp.de',
  '@myspaceinc.com',
  '@myspaceinc.org',
  '@myspamless.com',
  '@mystvpn.com',
  '@mytemp.email',
  '@mytempemail.com',
  '@mytempmail.com',
  '@mytrashmail.com',
  '@myzx.com',
  '@n1nja.org',
  '@nabuma.com',
  '@negated.com',
  '@neomailbox.com',
  '@nepwk.com',
  '@nervmich.net',
  '@nervtmich.net',
  '@net.ua',
  '@net.ua',
  '@netmails.com',
  '@netmails.net',
  '@netricity.nl',
  '@netris.net',
  '@nevermail.de',
  '@nfast.net',
  '@nguyenusedcars.com',
  '@nice-4u.com',
  '@nicknassar.com',
  '@nincsmail.com',
  '@nincsmail.hu',
  '@niwl.net',
  '@nm7.cc',
  '@nnh.com',
  '@nnot.net',
  '@nobulk.com',
  '@nobuma.com',
  '@noclickemail.com',
  '@noicd.com',
  '@nokiamail.com',
  '@nom.za',
  '@nomail2me.com',
  '@nomorespamemails.com',
  '@nonspam.eu',
  '@nonspammer.de',
  '@norseforce.com',
  '@nothingtoseehere.ca',
  '@notmailinator.com',
  '@notrnailinator.com',
  '@no-ux.com',
  '@now.im',
  '@nowhere.org',
  '@nowmymail.com',
  '@ntlhelp.net',
  '@nubescontrol.com',
  '@nurfuerspam.de',
  '@nutpa.net',
  '@nwldx.com',
  '@nwytg.net',
  '@o2stk.org',
  '@o7i.net',
  '@obfusko.com',
  '@objectmail.com',
  '@obobbo.com',
  '@obxpestcontrol.com',
  '@odaymail.com',
  '@odnorazovoe.ru',
  '@offshore-proxies.net',
  '@ohaaa.de',
  '@ohi.tw',
  '@okzk.com',
  '@olypmall.ru',
  '@omnievents.org',
  '@oneoffemail.com',
  '@oneoffmail.com',
  '@onet.pl',
  '@onewaymail.com',
  '@oolus.com',
  '@oopi.org',
  '@opayq.com',
  '@opp24.com',
  '@ordinaryamerican.net',
  '@org.ua',
  '@oroki.de',
  '@otherinbox.com',
  '@ourpreviewdomain.com',
  '@outlawspam.com',
  '@owlpic.com',
  '@ozyl.de',
  '@pa9e.com',
  '@pagamenti.tk',
  '@pancakemail.com',
  '@paplease.com',
  '@pastebitch.com',
  '@pepbot.com',
  '@peterdethier.com',
  '@pfui.ru',
  '@photomark.net',
  '@pi.vu',
  '@piki.si',
  '@pingir.com',
  '@pisls.com',
  '@pjjkp.com',
  '@plexolan.de',
  '@plhk.ru',
  '@pojok.ml',
  '@pokemail.net',
  '@politikerclub.de',
  '@pooae.com',
  '@pookmail.com',
  '@popesodomy.com',
  '@popgx.com',
  '@postacin.com',
  '@poutineyourface.com',
  '@powered.name',
  '@powlearn.com',
  '@pp.ua',
  '@pp.ua',
  '@pp.ua',
  '@primabananen.net',
  '@privacy.net',
  '@privatdemail.net',
  '@privy-mail.com',
  '@privymail.de',
  '@privy-mail.de',
  '@procrackers.com',
  '@projectcl.com',
  '@propscore.com',
  '@pro-tag.org',
  '@proxymail.eu',
  '@proxyparking.com',
  '@prtnx.com',
  '@psoxs.com',
  '@punkass.com',
  '@purcell.email',
  '@purelogistics.org',
  '@put2.net',
  '@putthisinyourspamdatabase.com',
  '@pwrby.com',
  '@qasti.com',
  '@qisdo.com',
  '@qisoa.com',
  '@qoika.com',
  '@quickinbox.com',
  '@quickmail.nl',
  '@r4nd0m.de',
  '@rabin.ca',
  '@raetp9.com',
  '@raiasu.ml',
  '@raketenmann.de',
  '@randomail.net',
  '@raqid.com',
  '@rbb.org',
  '@rcasd.com',
  '@reallymymail.com',
  '@realtyalerts.ca',
  '@receiveee.com',
  '@recipeforfailure.com',
  '@reconmail.com',
  '@recyclemail.dk',
  '@redfeathercrow.com',
  '@reliable-mail.com',
  '@remail.cf',
  '@remarkable.rocks',
  '@reptilegenetics.com',
  '@revolvingdoorhoax.org',
  '@rfc822.org',
  '@rhyta.com',
  '@riddermark.de',
  '@risingsuntouch.com',
  '@rmqkr.net',
  '@rnailinator.com',
  '@ro.lt',
  '@ronnierage.net',
  '@rotaniliam.com',
  '@rowe-solutions.com',
  '@royal.net',
  '@rppkn.com',
  '@rtrtr.com',
  '@ruffrey.com',
  '@rumgel.com',
  '@runi.ca',
  '@rustydoor.com',
  '@s0ny.net',
  '@s33db0x.com',
  '@sabrestlouis.com',
  '@safersignup.de',
  '@safetypost.de',
  '@sandelf.de',
  '@sanfinder.com',
  '@sanstr.com',
  '@sausen.com',
  '@scatmail.com',
  '@scay.net',
  '@schachrol.com',
  '@schafmail.de',
  '@schrott-email.de',
  '@sd3.in',
  '@secretemail.de',
  '@secured-link.net',
  '@secure-mail.cc',
  '@seekapps.com',
  '@selfdestructingmail.com',
  '@sendingspecialflyers.com',
  '@sendspamhere.com',
  '@senseless-entertainment.com',
  '@services391.com',
  '@sexical.com',
  '@sharedmailbox.org',
  '@sharklasers.com',
  '@shhmail.com',
  '@shieldedmail.com',
  '@shieldemail.com',
  '@shiftmail.com',
  '@shipfromto.com',
  '@shitmail.de',
  '@shitmail.org',
  '@shitware.nl',
  '@shortmail.net',
  '@shotmail.ru',
  '@showslow.de',
  '@shrib.com',
  '@shut.name',
  '@sify.com',
  '@sin.cl',
  '@sinnlos-mail.de',
  '@sino.tw',
  '@siteposter.net',
  '@sizzlemctwizzle.com',
  '@sjuaq.com',
  '@skeefmail.com',
  '@slaskpost.se',
  '@slave-auctions.net',
  '@slopsbox.com',
  '@slothmail.net',
  '@slushmail.com',
  '@sly.io',
  '@smashmail.de',
  '@smellfear.com',
  '@smtp99.com',
  '@snakemail.com',
  '@sneakemail.com',
  '@sneakmail.de',
  '@snkmail.com',
  '@sofimail.com',
  '@sofortmail.de',
  '@sofort-mail.de',
  '@sogetthis.com',
  '@sohu.com',
  '@soisz.com',
  '@soodmail.com',
  '@soodomail.com',
  '@soodonims.com',
  '@soon.it',
  '@spam.su',
  '@spamarrest.com',
  '@spamavert.com',
  '@spam-be-gone.com',
  '@spambob.com',
  '@spambob.net',
  '@spambog.com',
  '@spambog.de',
  '@spambog.ru',
  '@spambooger.com',
  '@spambox.org',
  '@spamcero.com',
  '@spamcorptastic.com',
  '@spamcowboy.com',
  '@spamcowboy.net',
  '@spamcowboy.org',
  '@spamday.com',
  '@spamdecoy.net',
  '@spamex.com',
  '@spamfighter.cf',
  '@spamfighter.gq',
  '@spamfighter.ml',
  '@spamfree.eu',
  '@spamfree24.com',
  '@spamfree24.de',
  '@spamfree24.eu',
  '@spamfree24.org',
  '@spamgoes.in',
  '@spamherelots.com',
  '@spamhereplease.com',
  '@spamhole.com',
  '@spamify.com',
  '@spaminator.de',
  '@spaml.com',
  '@spaml.de',
  '@spammotel.com',
  '@spamobox.com',
  '@spamoff.de',
  '@spamslicer.com',
  '@spamspot.com',
  '@spamthisplease.com',
  '@spamtrail.com',
  '@spb.ru',
  '@spikio.com',
  '@spoofmail.de',
  '@spr.io',
  '@spybox.de',
  '@squizzy.de',
  '@ssoia.com',
  '@stanfordujjain.com',
  '@starlight-breaker.net',
  '@startfu.com',
  '@startkeys.com',
  '@statdvr.com',
  '@stathost.net',
  '@steambot.net',
  '@stexsy.com',
  '@stinkefinger.net',
  '@stop-my-spam.cf',
  '@stop-my-spam.com',
  '@stop-my-spam.ga',
  '@stop-my-spam.ml',
  '@storj99.com',
  '@streetwisemail.com',
  '@stromox.com',
  '@stuckmail.com',
  '@stuffmail.de',
  '@suburbanthug.com',
  '@suckmyd.com',
  '@sudolife.net',
  '@sudomail.com',
  '@sudomail.net',
  '@sudoverse.com',
  '@sudoverse.net',
  '@sudoweb.net',
  '@sudoworld.com',
  '@sudoworld.net',
  '@suioe.com',
  '@super-auswahl.de',
  '@supergreatmail.com',
  '@supermailer.jp',
  '@superplatyna.com',
  '@superrito.com',
  '@superstachel.de',
  '@svk.jp',
  '@svxr.org',
  '@sweetxxx.de',
  '@swift10minutemail.com',
  '@tafmail.com',
  '@tafoi.gr',
  '@tagmymedia.com',
  '@tagyourself.com',
  '@talkinator.com',
  '@tanukis.org',
  '@tapchicuoihoi.com',
  '@tb-on-line.net',
  '@techemail.com',
  '@teleworm.com',
  '@tempail.com',
  '@tempalias.com',
  '@tempemail.co.za',
  '@tempemail.com',
  '@tempe-mail.com',
  '@tempemail.net',
  '@tempinbox.com',
  '@temp-mail.com',
  '@tempmail.de',
  '@temp-mail.de',
  '@tempmail.eu',
  '@tempmail.it',
  '@temp-mail.org',
  '@temp-mail.ru',
  '@tempmail2.com',
  '@tempmaildemo.com',
  '@tempmailer.com',
  '@tempmailer.de',
  '@tempomail.fr',
  '@temporarily.de',
  '@temporarioemail.com.br',
  '@temporaryemail.net',
  '@temporaryforwarding.com',
  '@temporaryinbox.com',
  '@temporarymailaddress.com',
  '@tempsky.com',
  '@tempthe.net',
  '@tempymail.com',
  '@testudine.com',
  '@thankyou2010.com',
  '@theaviors.com',
  '@thelimestones.com',
  '@thembones.com.au',
  '@thietbivanphong.asia',
  '@thisisnotmyrealemail.com',
  '@thismail.net',
  '@thnikka.com',
  '@thraml.com',
  '@thrma.com',
  '@throam.com',
  '@thrott.com',
  '@throwam.com',
  '@throwawayemailaddress.com',
  '@throwawaymail.com',
  '@throya.com',
  '@thxmate.com',
  '@tilien.com',
  '@tittbit.in',
  '@tiv.cc',
  '@tizi.com',
  '@tkitc.de',
  '@tlpn.org',
  '@tmail.com',
  '@tmailinator.com',
  '@tmails.net',
  '@toddsbighug.com',
  '@toiea.com',
  '@tokenmail.de',
  '@tonymanso.com',
  '@top1post.ru',
  '@topranklist.de',
  '@toprumours.com',
  '@tormail.org',
  '@tosunkaya.com',
  '@totalvista.com',
  '@totesmail.com',
  '@tp-qa-mail.com',
  '@tqoai.com',
  '@tqosi.com',
  '@tranceversal.com',
  '@trash2009.com',
  '@trash-amil.com',
  '@trashcanmail.com',
  '@trashdevil.com',
  '@trashdevil.de',
  '@trashemail.de',
  '@trashinbox.com',
  '@trash-mail.cf',
  '@trashmail.com',
  '@trash-mail.com',
  '@trashmail.de',
  '@trash-mail.de',
  '@trash-mail.gq',
  '@trashmail.net',
  '@trashmailer.com',
  '@trashymail.com',
  '@trashymail.net',
  '@trasz.com',
  '@trayna.com',
  '@trbvm.com',
  '@trbvn.com',
  '@trbvo.com',
  '@trialmail.de',
  '@trickmail.net',
  '@trillianpro.com',
  '@trollproject.com',
  '@trungtamtoeic.com',
  '@tryalert.com',
  '@tualias.com',
  '@turoid.com',
  '@tverya.com',
  '@twinmail.de',
  '@twoweirdtricks.com',
  '@txtadvertise.com',
  '@tyldd.com',
  '@ubismail.net',
  '@ubm.md',
  '@uggsrock.com',
  '@uhhu.ru',
  '@umail.net',
  '@undo.it',
  '@unids.com',
  '@unmail.ru',
  '@upliftnow.com',
  '@uplipht.com',
  '@uploadnolimit.com',
  '@urfunktion.se',
  '@urltc.com',
  '@uroid.com',
  '@us.af',
  '@us.to',
  '@uu.gl',
  '@uu.gl',
  '@uyhip.com',
  '@valemail.net',
  '@valhalladev.com',
  '@vankin.de',
  '@vctel.com',
  '@vdig.com',
  '@venompen.com',
  '@verdejo.com',
  '@veryday.eu',
  '@veryrealemail.com',
  '@vfemail.net',
  '@victoriantwins.com',
  '@vidchart.com',
  '@viditag.com',
  '@vikingsonly.com',
  '@vinernet.com',
  '@vipxm.net',
  '@viralplays.com',
  '@vixletdev.com',
  '@vkcode.ru',
  '@vmani.com',
  '@vmpanda.com',
  '@voidbay.com',
  '@vomoto.com',
  '@vorga.org',
  '@votiputox.org',
  '@voxelcore.com',
  '@vpn.st',
  '@vps30.com',
  '@vrmtr.com',
  '@vsimcard.com',
  '@vubby.com',
  '@vztc.com',
  '@walala.org',
  '@walkmail.net',
  '@walkmail.ru',
  '@wallm.com',
  '@wbml.net',
  '@web.id',
  '@wegwerfadresse.de',
  '@wegwerfemail.com',
  '@wegwerfemail.de',
  '@wegwerf-email.de',
  '@weg-werf-email.de',
  '@wegwerfemail.net',
  '@wegwerf-email.net',
  '@wegwerfemailadresse.com',
  '@wegwerf-emails.de',
  '@wegwerfmail.de',
  '@wegwerfmail.net',
  '@wegwerpmailadres.nl',
  '@wg0.com',
  '@wh4f.org',
  '@whatiaas.com',
  '@whatifanalytics.com',
  '@whatpaas.com',
  '@whatsaas.com',
  '@whopy.com',
  '@wickmail.net',
  '@widget.gg',
  '@wilemail.com',
  '@willselfdestruct.com',
  '@wimsg.com',
  '@wins.com.br',
  '@wralawfirm.com',
  '@wronghead.com',
  '@ws.gy',
  '@wuzup.net',
  '@wuzupmail.net',
  '@wwwnew.eu',
  '@wxnw.net',
  '@x24.com',
  '@xcompress.com',
  '@xcpy.com',
  '@xemaps.com',
  '@xents.com',
  '@xjoi.com',
  '@xl.cx',
  '@xmail.com',
  '@xmaily.com',
  '@xn--9kq967o.com',
  '@xrho.com',
  '@xwaretech.com',
  '@xwaretech.net',
  '@xzsok.com',
  '@yapped.net',
  '@yaqp.com',
  '@ycare.de',
  '@ye.vc',
  '@yedi.org',
  '@yep.it',
  '@yogamaven.com',
  '@yopmail.com',
  '@yopmail.fr',
  '@yopmail.net',
  '@yougotgoated.com',
  '@youmail.ga',
  '@youmailr.com',
  '@yourdomain.com',
  '@you-spam.com',
  '@yspend.com',
  '@yui.it',
  '@yuurok.com',
  '@yxzx.net',
  '@z0d.eu',
  '@z86.ru',
  '@zain.site',
  '@zainmax.net',
  '@zasod.com',
  '@zebins.com',
  '@zebins.eu',
  '@zehnminuten.de',
  '@zehnminutenmail.de',
  '@zepp.dk',
  '@zetmail.com',
  '@zfymail.com',
  '@zik.dj',
  '@zoaxe.com',
  '@zoemail.com',
  '@zoemail.net',
  '@zp.ua',
  '@zp.ua',
  '@zumpul.com',
  '@zxcv.com',
  '@zxcvbnm.com',
  '@zzz.com'
];

const isInBlackList = email => {
  return blackList.filter(f => {
    return email.match(f);
  }).length > 0;
};

exports.isInBlackList = isInBlackList;
