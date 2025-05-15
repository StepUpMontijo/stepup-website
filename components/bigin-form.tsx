"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { toast } from "sonner";

interface BiginFormProps {
  className?: string;
  transparent?: boolean;
  title?: string;
  subtitle?: string;
}

export default function BiginForm({
  className = "",
  transparent = false,
  title,
  subtitle,
}: BiginFormProps) {
  const locale = useLocale();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    // Function to add the Zoho Bigin script
    const loadBiginForm = () => {
      // Clear previous content if it exists
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = "";
      }

      // Get the Zoho Bigin configuration keys from the environment variables
      const xnQsjsdp = process.env.NEXT_PUBLIC_ZOHO_BIGIN_XNQSJSDP;
      const xmIwtLD = process.env.NEXT_PUBLIC_ZOHO_BIGIN_XMIWTLD;
      const formId = process.env.NEXT_PUBLIC_ZOHO_BIGIN_FORM_ID;
      const scriptRid = process.env.NEXT_PUBLIC_ZOHO_BIGIN_RID;
      const scriptGid = process.env.NEXT_PUBLIC_ZOHO_BIGIN_GID;

      // Check if the environment variables are defined
      if (!xnQsjsdp || !xmIwtLD || !formId || !scriptRid || !scriptGid) {
        console.error(
          "Zoho Bigin configuration is missing. Please check your environment variables."
        );

        // Show error message in the form
        if (formContainerRef.current) {
          formContainerRef.current.innerHTML = `
            <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              <h3 class="font-medium mb-2">Configuration Error</h3>
              <p>The form cannot be loaded due to missing configuration. Please contact the administrator.</p>
            </div>
          `;
        }
        return;
      }

      // Create the iframe (hidden) to receive the form response
      const iframe = document.createElement("iframe");
      iframe.id = `hidden${formId}Frame`;
      iframe.name = `hidden${formId}Frame`;
      iframe.style.display = "none";
      iframe.className = "iframe-container";
      formContainerRef.current?.appendChild(iframe);

      // Create the main container
      const formParent = document.createElement("div");
      formParent.className = "bigin-form-parent";
      formParent.id = `BiginWebToRecordFormParent${formId}`;
      formContainerRef.current?.appendChild(formParent);

      // Create the form wrapper
      const formWrapper = document.createElement("div");
      formWrapper.className = "bigin-form-wrapper";
      formWrapper.id = `BiginWebToRecordFormDiv${formId}`;
      formParent.appendChild(formWrapper);

      // Add meta and form
      formWrapper.innerHTML = `
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <META HTTP-EQUIV='content-type' CONTENT='text/html;charset=UTF-8'>
        <form id='BiginWebToRecordForm${formId}' name='BiginWebToRecordForm${formId}' class='space-y-6' method='POST' enctype='multipart/form-data' target='hidden${formId}Frame' onSubmit='javascript:document.charset="UTF-8"; return checkMandatory${formId}()' accept-charset='UTF-8'>
          <!-- Hidden fields required for Zoho Bigin -->
          <input type='text' style='display:none;' name='xnQsjsdp' value='${xnQsjsdp}'/>
          <input type='hidden' name='zc_gad' id='zc_gad' value=''/>
          <input type='text' style='display:none;' name='xmIwtLD' value='${xmIwtLD}'/>
          <input type='text' style='display:none;' name='actionType' value='UG90ZW50aWFscw=='/>
          <input type='hidden' name='rmsg' id='rmsg' value='true'/>
          <input type='text' style='display:none;' name='returnURL' value='null' />
          
          ${
            title || subtitle
              ? `
          <!-- Title and Subtitle -->
          <div class="mb-8 text-center">
            ${
              title
                ? `<h2 class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-3">${title}</h2>`
                : ""
            }
            ${
              subtitle
                ? `<p class="text-lg text-gray-600 mt-2 max-w-lg mx-auto">${subtitle}</p>`
                : ""
            }
          </div>
          `
              : ""
          }
          
          <!-- Grid for name and last name -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                ${locale === "en" ? "First Name" : "Nome"}*
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input name='Potential Name' maxlength='120' type='text' class='w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors' placeholder="${
                  locale === "en" ? "John" : "Maria"
                }" oninput='removeError(this)'/>
              </div>
              <div class="error-container"></div>
            </div>
            
            <!-- Last Name -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                ${locale === "en" ? "Last Name" : "Sobrenome"}*
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input name='Contacts.Last Name' maxlength='80' type='text' class='w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors' placeholder="${
                  locale === "en" ? "Smith" : "Silva"
                }" oninput='removeError(this)'/>
              </div>
              <div class="error-container"></div>
            </div>
          </div>
          
          <!-- Grid for phone and email -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <!-- Phone -->
            <div>
              <label for="mobile" class="block text-sm font-medium text-gray-700 mb-2">
                ${locale === "en" ? "Mobile" : "Telemóvel"}*
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <input fvalidate='true' ftype='mobile' name='Contacts.Mobile' maxlength='30' type='text' class='w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors' placeholder="+351 923 456 789" oninput='removeError(this)'/>
              </div>
              <div class="error-container"></div>
            </div>
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                ${locale === "en" ? "Email" : "Email"}*
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <input fvalidate='true' ftype='email' name='Contacts.Email' maxlength='100' type='text' class='w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors' placeholder="exemplo@email.com" oninput='removeError(this)'/>
              </div>
              <div class="error-container"></div>
            </div>
          </div>
          
          <!-- Hidden fields for pipeline and stage -->
          <div style='display:none;'>  
            <select name='Pipeline' class='hidden'>
              <option selected value='Sales&#x20;Pipeline&#x20;Standard'>Sales Pipeline Standard</option>
            </select>
          </div>
          <div style='display:none;'>
            <select name='Stage' class='hidden'>
              <option selected value='Qualification'>Qualification</option>
              <option value='Book&#x20;trial&#x20;class'>Book trial class</option>
            </select>
          </div>
          
          <!-- Submit button -->
          <div class="mt-8">
            <button type="submit" id="formsubmit" class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium h-12 px-6 rounded-xl shadow-lg hover:shadow-xl will-change-transform transform hover:-translate-y-1 active:translate-y-0 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>${locale === "en" ? "Submit" : "Enviar"}</span>
            </button>
            
            <p class="text-center text-xs text-gray-500 mt-4">
              ${
                locale === "en"
                  ? "By submitting this form, you agree to be contacted by our team."
                  : "Ao submeter este formulário, concorda em ser contactado pela nossa equipa."
              }
            </p>
          </div>
          
          <!-- Powered by Bigin - versão discreta -->
          <div class="mt-8 text-center">
            <a class="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center" target="_blank" href="https://zoho.eu/bigin/?utm_source=biginwebforms&utm_medium=organic&utm_id=product" rel="noopener noreferrer">
              <span class="mr-1">Powered by</span>
              <img src="https://bigin.zoho.eu/images/bigin-logo-xs.svg" class="h-3 mx-1" alt="Bigin logo" />
              <span>Bigin</span>
            </a>
          </div>
        </form>
      `;

      // Add the validation script
      const script = document.createElement("script");
      script.innerHTML = `
        var mndFileds=new Array('Potential\\x20Name','Contacts.Last\\x20Name', 'Contacts.Mobile', 'Contacts.Email');
        var fldLangVal=new Array('Nome', 'Sobrenome', 'Telemóvel', 'Email');
        
        function removeError(fieldObj) {
          var parentDiv = fieldObj.closest('div').parentElement;
          var errorContainer = parentDiv.querySelector('.error-container');
          if (errorContainer) {
            errorContainer.innerHTML = '';
            fieldObj.classList.remove('border-red-400');
            fieldObj.classList.add('border-gray-200');
            
            // Restore the icon color
            const iconContainer = fieldObj.parentElement.querySelector('svg');
            if (iconContainer) {
              iconContainer.classList.remove('text-red-500');
              iconContainer.classList.add('text-blue-500');
            }
          }
        }
        
        function setError(fieldObj, label) {
          var parentDiv = fieldObj.closest('div').parentElement;
          var errorContainer = parentDiv.querySelector('.error-container');
          
          if (errorContainer) {
            // Clear previous errors
            errorContainer.innerHTML = '';
            
            // Create error element
            var errorElement = document.createElement('div');
            errorElement.className = 'mt-2 text-sm text-red-500 flex items-center';
            errorElement.innerHTML = '<span class="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>' + label;
            
            // Add to container
            errorContainer.appendChild(errorElement);
            
            // Change field style
            fieldObj.classList.remove('border-gray-200');
            fieldObj.classList.add('border-red-400');
            
            // Change icon color
            const iconContainer = fieldObj.parentElement.querySelector('svg');
            if (iconContainer) {
              iconContainer.classList.remove('text-blue-500');
              iconContainer.classList.add('text-red-500');
            }
          }
        }
        
        function validateFields${formId}() {
          var isReturn = true;
          var form = document.forms['BiginWebToRecordForm${formId}'];
          var validateFld = form.querySelectorAll('[fvalidate=true]');
          var i;
          for (i = 0; i < validateFld.length; i++)
          {
            var validateFldVal = validateFld[i].value;
            if(validateFldVal !== '') {
              var fLabel = validateFld[i].parentElement.parentElement.querySelector('label').innerText;
              switch(validateFld[i].getAttribute('ftype')) {
              case 'email':
                if(validateFldVal.match(/^([A-Za-z0-9-._%'+/]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,22})$/) === null) {
                  setError(validateFld[i], '${
                    locale === "en"
                      ? "Please enter a valid email address"
                      : "Por favor, insira um endereço de email válido"
                  }');
                  isReturn = false;
                }
                break;
              case 'mobile':
                if(validateFldVal.match(/^[0-9a-zA-Z+.()\\-;\\s]+$/) === null) {
                  setError(validateFld[i], '${
                    locale === "en"
                      ? "Please enter a valid phone number"
                      : "Por favor, insira um número de telemóvel válido"
                  }');
                  isReturn = false;
                }
                break;
              }
            }
          }
          return isReturn;
        }

        function checkMandatory${formId}() {
          var isReturn = true;
          
          // Check mandatory fields
          for(i=0; i<mndFileds.length; i++) {
            var fieldObj = document.forms['BiginWebToRecordForm${formId}'][mndFileds[i]];
            if(fieldObj) {
              if (((fieldObj.value).replace(/^\\s+|\\s+$/g, '')).length==0) {
                let errorMessage = '';
                
                // Custom error messages for each field
                switch(mndFileds[i]) {
                  case 'Potential\\x20Name':
                    errorMessage = '${
                      locale === "en"
                        ? "Please enter your first name"
                        : "Por favor, insira o seu nome"
                    }';
                    break;
                  case 'Contacts.Last\\x20Name':
                    errorMessage = '${
                      locale === "en"
                        ? "Please enter your last name"
                        : "Por favor, insira o seu sobrenome"
                    }';
                    break;
                  case 'Contacts.Mobile':
                    errorMessage = '${
                      locale === "en"
                        ? "Please enter your phone number"
                        : "Por favor, insira o seu número de telemóvel"
                    }';
                    break;
                  case 'Contacts.Email':
                    errorMessage = '${
                      locale === "en"
                        ? "Please enter your email address"
                        : "Por favor, insira o seu endereço de email"
                    }';
                    break;
                  default:
                    errorMessage = fldLangVal[i] + ' ${
                      locale === "en" ? "is required" : "é obrigatório"
                    }';
                }
                
                setError(fieldObj, errorMessage);
                isReturn = false;
              }
            }
          }
          
          if(!validateFields${formId}()){isReturn = false;}
          
          if(!isReturn){
            // Show error notification
            window.parent.postMessage({
              type: 'showToast',
              toastType: 'error',
              message: '${
                locale === "en"
                  ? "Please fill in all required fields correctly"
                  : "Por favor, preencha todos os campos obrigatórios corretamente"
              }'
            }, '*');
            
            // Focus on the first field with error
            var errorContainers = document.querySelectorAll('.error-container');
            for(var i=0; i<errorContainers.length; i++) {
              if(errorContainers[i].innerHTML !== '') {
                var inputField = errorContainers[i].parentElement.querySelector('input');
                if(inputField) {
                  inputField.focus();
                  break;
                }
              }
            }
          } else {
            document.getElementById('formsubmit').disabled = true;
            document.getElementById('formsubmit').innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> ${
              locale === "en" ? "Submitting..." : "A enviar..."
            }';
          }
          
          return isReturn; 
        }

        document.getElementById('hidden${formId}Frame').addEventListener('load', function () {
          try {
            var doc = arguments[0].currentTarget.contentWindow.document;
            if(doc.body.childElementCount !== 0) {
              // Form submitted successfully
              document.getElementById('formsubmit').disabled = true;
              document.getElementById('formsubmit').classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-indigo-600');
              document.getElementById('formsubmit').classList.add('bg-green-500');
              document.getElementById('formsubmit').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>${
                locale === "en" ? "Sent!" : "Enviado!"
              }</span>';
              
              // Show success notification
              window.parent.postMessage({
                type: 'showToast',
                toastType: 'success',
                message: '${
                  locale === "en"
                    ? "Your message has been sent successfully!"
                    : "A sua mensagem foi enviada com sucesso!"
                }'
              }, '*');
              
              // Clear the fields
              var form = document.forms['BiginWebToRecordForm${formId}'];
              var inputs = form.querySelectorAll('input[type="text"]');
              for(var i=0; i<inputs.length; i++) {
                if(!inputs[i].name.startsWith('x')) { // Don't clear hidden Zoho fields
                  inputs[i].value = '';
                }
              }
              
              // Restore button after 3 seconds
              setTimeout(function() {
                document.getElementById('formsubmit').disabled = false;
                document.getElementById('formsubmit').classList.remove('bg-green-500');
                document.getElementById('formsubmit').classList.add('bg-gradient-to-r', 'from-blue-500', 'to-indigo-600');
                document.getElementById('formsubmit').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg><span>${
                  locale === "en" ? "Submit" : "Enviar"
                }</span>';
              }, 3000);
            }
          } catch (error) {
            console.log('Error in form submission:', error);
            
            // Show error notification
            window.parent.postMessage({
              type: 'showToast',
              toastType: 'error',
              message: '${
                locale === "en"
                  ? "An error occurred while submitting the form. Please try again."
                  : "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
              }'
            }, '*');
          }
        });
      `;
      formContainerRef.current?.appendChild(script);

      // Load the Zoho Bigin script
      const biginScript = document.createElement("script");
      biginScript.id = "wf_script";
      biginScript.src = `https://bigin.zoho.eu/crm/WebformScriptServlet?rid=${scriptRid}gid${scriptGid}`;
      formContainerRef.current?.appendChild(biginScript);

      scriptLoaded.current = true;
    };

    loadBiginForm();

    // Cleanup when unmounting
    return () => {
      scriptLoaded.current = false;
    };
  }, [locale, title, subtitle]);

  // Message handler for toast notifications
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "showToast") {
        if (event.data.toastType === "success") {
          toast.success(event.data.message, {
            duration: 5000,
          });
        } else if (event.data.toastType === "error") {
          toast.error(event.data.message, {
            duration: 5000,
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Determine the style classes based on the transparent prop
  const containerClasses = transparent
    ? `${className}`
    : `${className} bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 overflow-hidden`;

  return (
    <div className={containerClasses}>
      <div ref={formContainerRef} className="bigin-form-container"></div>
    </div>
  );
}
