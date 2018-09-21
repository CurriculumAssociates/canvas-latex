#!gmake
#
# Version: Apache License 2.0
#
# Copyright (c) 2013 The MathJax Consortium
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

CUSTOM=custom.cfg

-include $(CUSTOM)

help:
	@echo "Usage:"
	@echo ""
	@echo "make config"
	@echo "  Generate the Perl configuration"
	@echo ""
	@echo "make fonts"
	@echo "  Generate and install MathJax fonts and related data."
	@echo ""
	@echo "make pack"
	@echo "  Run MathJax packer"
	@echo ""
	@echo "make clean"
	@echo "  Remove temporary directories and files."
	@echo ""

$(CUSTOM):
	@cp default.cfg $(CUSTOM);
	@echo "Configuration file '$(CUSTOM)' created.";
	@echo "Edit this file and run 'make config'.";
	@exit 1

$(CUSTOM).pl: $(CUSTOM)
	@echo "Creating Perl config file..."
	@cp $(CUSTOM) $(CUSTOM).pl
	@echo >> $(CUSTOM).pl # ensure that the config file ends by a new line
	@echo "MFTRACE_PATH=`$(WHICH) $(MFTRACE)`" >> $(CUSTOM).pl
	@$(SED) -i "s|^\([A-Z_0-9]*\)=\(.*\)|$$\1='\2';|" $(CUSTOM).pl
	@echo "1;" >> $(CUSTOM).pl

config: $(CUSTOM).pl

fonts: $(CUSTOM).pl
	$(MAKE) -C fonts all

pack: $(CUSTOM).pl
	$(MAKE) -C packer all

clean:
	rm -f $(CUSTOM).pl
	$(MAKE) -C fonts clean

.PHONY: fonts
