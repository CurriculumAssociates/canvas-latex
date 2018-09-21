#!gmake
#
# Version: Apache License 2.0
#
# Copyright (c) 2013 MathJax Project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

include ../../../custom.cfg

MFTRACE_MODIFIED=lib/mftrace-modified

all: fonts install

blacker: $(MFTRACE_MODIFIED)
$(MFTRACE_MODIFIED):
	$(PERL) makeBlacker 15 # values between 10 and 30 seem best

pfa: $(MFTRACE_MODIFIED)
	@echo "cmr10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify cmr10

	@echo "cmmi10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --encoding $(TETEXENCODING)/aae443f0.enc --simplify cmmi10

	@echo "cmsy10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --encoding $(TETEXENCODING)/10037936.enc --simplify cmsy10

	@echo "cmex10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --keep cmex10
	$(FONTFORGE) -lang=ff -c 'Open("mftrace.dir/cmex10.pfa.raw");SelectAll();AddExtrema();Simplify();AutoHint();Generate("cmex10.pfa");'
	rm -rf mftrace.dir
	rm cmex10.afm

	@echo "cmbx10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify cmbx10

	@echo "cmbxti10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify cmbxti10

	@echo "cmti10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify cmti10

	@echo "msam10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify --encoding $(TETEXENCODING)/10037936.enc msam10

	@echo "msbm10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 450 --simplify --encoding $(TETEXENCODING)/10037936.enc msbm10

	@echo "cmmib10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --encoding $(TETEXENCODING)/aae443f0.enc --simplify cmmib10

	@echo "cmbsy10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --encoding $(TETEXENCODING)/10037936.enc --simplify cmbsy10

	@echo "cmtt10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify cmtt10

	@echo "cmss10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify cmss10
	@echo "cmssi10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify cmssi10
	@echo "cmssbx10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify cmssbx10

	@echo "eufm10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify eufm10
	@echo "eufb10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify eufb10

        #echo "eusm10"
        #$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify eusm10
        #echo "eusb10"
        #$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify eusb10

	@echo "rsfs10"
	$(PYTHON) $(MFTRACE_MODIFIED) --magnification 1000 --simplify --encoding $(BASEENCODING)/tex256.enc rsfs10

	mkdir -p pfa
	rm -f pfa/*
	mv *.pfa pfa

ff: pfa
	mkdir -p ff otf
	rm -f ff/* otf/*
	$(PERL)	makeFF

ttf: ff
	mkdir -p ttf
	rm -f ttf/*

        # Handle the KaTeX_Size4 font first as it used by other fonts.
	@echo "KaTeX_Size4.ff"
	$(FONTFORGE) -lang=ff -script ff/KaTeX_Size4.ff

	@for file in `cd ff; ls *.ff | $(GREP) -v KaTeX_Size4`; do \
		echo ""; \
		echo $$file; \
		$(FONTFORGE) -lang=ff -script ff/$$file; \
		done

	@for file in `ls ttf/*.ttf`; do \
		echo "hinting $$file"; \
		if echo "$$file" | $(GREP) -q -e "Greek" -e "Size[1-4]" -e "Typewriter" -e "Win"; then \
			$(TTFAUTOHINT) --windows-compatibility --symbol $$file $$file.hinted; \
		else \
			$(TTFAUTOHINT) --windows-compatibility $$file $$file.hinted; \
		fi; \
		mv $$file.hinted $$file; \
		done

	./fix_os2_metrics.rb ttf/
eot: ttf
	mkdir -p eot
	rm -f eot/*

	@for file in `ls ttf/*.ttf | $(SED) 's|ttf/\(.*\)\.ttf|\1|'`; do \
		echo "Generating $$file.eot..."; \
		$(TTF2EOT) < ttf/$$file.ttf > eot/$$file.eot; \
		done

	rm -f eot/*WinChrome* eot/*Greek*

svg: ttf
	mkdir -p svg
	rm -f svg/*

	@for file in `ls ttf/*.ttf | $(SED) 's|ttf/\(.*\)\.ttf|\1|'`; do \
		echo "Generating $$file.svg..."; \
		$(JAVA) -jar $(TTF2SVG) ttf/$$file.ttf \
		-id $$file -o svg/$$file.svg -l 0 -h 65535; \
		done

	rm -f svg/*WinIE6* svg/*Greek*

woff: otf ttf
	@for file in `ls ttf/*.ttf | $(SED) 's|ttf/\(.*\)\.ttf|\1|'`; do \
		echo "Generating $$file.woff..."; \
		$(SFNT2WOFF) ttf/$$file.ttf; \
		done

	mkdir -p woff
	rm -f woff/*
	mv ttf/*.woff woff
	rm -f woff/*WinChrom* woff/*WinIE6* woff/*Greek*

woff2: woff
	@for file in `ls ttf/*.ttf | $(SED) 's|ttf/\(.*\)\.ttf|\1|'`; do \
		echo "Generating $$file.woff2..."; \
		$(WOFF2) ttf/$$file.ttf; \
		done

	mkdir -p woff2
	rm -f woff2/*
	mv ttf/*.woff2 woff2
	rm -f woff2/*WinChrom* woff2/*WinIE6* woff2/*Greek*

css: woff
	mkdir -p css
	rm -f css/*

	@for file in `ls woff/*.woff | $(SED) 's|woff/\(.*\)\.woff|\1|'`; do \
		echo "Generating $$file.css..."; \
		$(PERL) woff2css $$file > css/$$file.css; \
		end

	$(PERL) css2all css/*.css > KaTeX-All.css
	mv KaTeX-All.css css

OTFandTTF: ttf

fonts: OTFandTTF eot svg woff # css

install:
        #Copy the font files into the system font directory
        #rm -f $FONTDIR/KaTeX_*
	cp `ls otf/*.otf | $(GREP) -v 'Greek'` $(FONTDIR)
        # echo `ls ttf/*.ttf | $(GREP) -Ev 'WinChro|WinIE6'`
	cp ttf/*Greek*.ttf $(FONTDIR)

        #  Put the fonts into the KaTeX fonts folder
	rm -f $(MATHJAXDIR)/fonts/HTML-CSS/TeX/otf/*.*
	rm -f $(MATHJAXDIR)/fonts/HTML-CSS/TeX/eot/*.*
	rm -f $(MATHJAXDIR)/fonts/HTML-CSS/TeX/svg/*.*
	rm -f $(MATHJAXDIR)/fonts/HTML-CSS/TeX/woff/*.*
        #rm -f $(MATHJAXDIR)/fonts/HTML-CSS/TeX/css/*.*
	cp `ls otf/*.otf | $(GREP) -v 'Greek'` $(MATHJAXDIR)/fonts/HTML-CSS/TeX/otf
	cp eot/*.eot $(MATHJAXDIR)/fonts/HTML-CSS/TeX/eot
	cp svg/*.svg $(MATHJAXDIR)/fonts/HTML-CSS/TeX/svg
	cp woff/*.woff $(MATHJAXDIR)/fonts/HTML-CSS/TeX/woff
        #cp css/*.css $(MATHJAXDIR)/fonts/HTML-CSS/TeX/css

clean:
	rm -f $(MFTRACE_MODIFIED) lib/blacker.mf
	rm -rf pfa ff otf ttf eot svg woff css
