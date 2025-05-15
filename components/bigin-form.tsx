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

    // Function to add the Zoho Bigin form
    const loadBiginForm = () => {
      // Clear previous content if it exists
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = "";
      }

      // Get the Zoho Bigin configuration keys from the environment variables
      const xnQsjsdp = process.env.NEXT_PUBLIC_ZOHO_BIGIN_XNQSJSDP;
      const xmIwtLD = process.env.NEXT_PUBLIC_ZOHO_BIGIN_XMIWTLD;
      const formId = process.env.NEXT_PUBLIC_ZOHO_BIGIN_FORM_ID;

      // Check if the environment variables are defined
      if (!xnQsjsdp || !xmIwtLD || !formId) {
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

      // Use HTML provided by Zoho Bigin directly
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = `
          <iframe id='hidden${formId}Frame' name='hidden${formId}Frame' style='display: none;' class='iframe-container'></iframe>
          <div class='bigin-form-parent' id='BiginWebToRecordFormParent${formId}'>
            <div class='bigin-form-wrapper' id='BiginWebToRecordFormDiv${formId}'>
              <meta name='viewport' content='width=device-width, initial-scale=1.0'>
              <META HTTP-EQUIV='content-type' CONTENT='text/html;charset=UTF-8'>
              <form id='BiginWebToRecordForm${formId}' name='BiginWebToRecordForm${formId}' class='bigin-wf-form-component' data-ux-form-alignment='top' method='POST' enctype='multipart/form-data' target='hidden${formId}Frame' onSubmit='javascript:document.charset="UTF-8"; var isValid = validateForm${formId}(); return isValid;' accept-charset='UTF-8'>
                <!-- Do not remove this code. -->
                <input type='text' style='display:none;' name='xnQsjsdp' value='${xnQsjsdp}'/>
                <input type='hidden' name='zc_gad' id='zc_gad' value=''/>
                <input type='text' style='display:none;' name='xmIwtLD' value='${xmIwtLD}'/>
                <input type='text' style='display:none;' name='actionType' value='UG90ZW50aWFscw=='/>
                <input type='hidden' name='rmsg' id='rmsg' value='true'/>
                <div id='elementDiv${formId}' class='bigin-wf-form-wrapper'>
                  <div class='bigin-wf-row'>  
                    <div class='bigin-wf-label'>${
                      locale === "en" ? "First Name" : "Nome"
                    }</div>
                    <div class='bigin-wf-field bigin-wf-field-mandatory'>
                      <div class='bigin-wf-field-inner'>
                      <input name='Potential Name' maxlength='120' type='text' value='' class='bigin-wf-field-item bigin-wf-field-input' oninput='removeError(this)'/>
                      </div>
                    </div>
                  </div>
                  <div class='bigin-wf-row'>  
                    <div class='bigin-wf-label'>${
                      locale === "en" ? "Last Name" : "Sobrenome"
                    }</div>
                    <div class='bigin-wf-field bigin-wf-field-mandatory'>
                      <div class='bigin-wf-field-inner'>
                      <input name='Contacts.Last Name' maxlength='80' type='text' value='' class='bigin-wf-field-item bigin-wf-field-input' oninput='removeError(this)'/>
                      </div>
                    </div>
                  </div>
                  <div class='bigin-wf-row'>  
                    <div class='bigin-wf-label'>${
                      locale === "en" ? "Mobile" : "Telemóvel"
                    }</div>
                    <div class='bigin-wf-field'>
                      <div class='bigin-wf-field-inner'>
                      <input fvalidate='true' ftype='mobile' name='Contacts.Mobile' maxlength='30' type='text' value='' class='bigin-wf-field-item bigin-wf-field-input' oninput='removeError(this)'/>
                      </div>
                    </div>
                  </div>
                  <div class='bigin-wf-row'>  
                    <div class='bigin-wf-label'>${
                      locale === "en" ? "Email" : "Email"
                    }</div>
                    <div class='bigin-wf-field'>
                      <div class='bigin-wf-field-inner'>
                      <input fvalidate='true' ftype='email' name='Contacts.Email' maxlength='100' type='text' value='' class='bigin-wf-field-item bigin-wf-field-input' oninput='removeError(this)'/>
                      </div>
                    </div>
                  </div>
                  <div class='bigin-wf-row' style='display:none;';>  
                    <div class='bigin-wf-label'>Sub-Pipeline</div>
                    <div class='bigin-wf-field'>
                      <div class='bigin-wf-field-inner dropdown-contents'>
                      <select name='Pipeline' class='bigin-wf-field-item bigin-wf-field-dropdown' data-wform-field='select' onchange='removeError(this);'>
                        <option selected value='Sales&#x20;Pipeline&#x20;Standard'>Sales Pipeline Standard</option>
                      </select>
                      </div>
                    </div>
                  </div>
                  <div class='bigin-wf-row' style='display:none;';>  
                    <div class='bigin-wf-label'>Stage</div>
                    <div class='bigin-wf-field'>
                      <div class='bigin-wf-field-inner dropdown-contents'>
                      <select name='Stage' class='bigin-wf-field-item bigin-wf-field-dropdown' data-wform-field='select' onchange='removeError(this);'>
                        <option selected value='Qualification'>Qualification</option>
                        <option value='Book&#x20;trial&#x20;class'>Book trial class</option>
                      </select>
                      </div>
                    </div>
                  </div>
                  <div class='bigin-wform-btn-wrap' data-ux-pos='left'>
                    <input id='formsubmit' type='submit' class='bigin-wf-btn' data-ux-btn-type='default' value='${
                      locale === "en" ? "Submit" : "Enviar"
                    }'/>
                  </div>
                </div>
                <a class='bigin-wform-poweredby-container' target='_blank' href='https://zoho.eu/bigin/?utm_source=biginwebforms&utm_medium=organic&utm_id=product' id='poweredBy${formId}'>
                  <span style='padding-right: 5px;color: #C5D4E5;'>Powered by</span>
                  <img src='https://bigin.zoho.eu/images/bigin-logo-xs.svg' style='margin-right: 5px;'/>
                  <span>Bigin</span>
                </a>
              </form>
            </div>
          </div>
        `;

        // Add inline validation script
        const script = document.createElement("script");
        script.innerHTML = `
          var mndFileds=new Array('Potential\\x20Name','Contacts.Last\\x20Name');
          var fldLangVal=new Array('First Name','Last Name');
          var wfInnerWidth = window.innerWidth;
          if(wfInnerWidth <= 768){
            document.forms['BiginWebToRecordForm${formId}'].setAttribute('data-ux-form-alignment', 'top');
          }
          function removeError(fieldObj) {
            var parentElement = fieldObj.closest('.bigin-wf-field'),
              childEle = parentElement.getElementsByClassName('bigin-wf-error-parent-ele')[0];
            if(childEle) {
              parentElement.classList.remove('bigin-wf-field-error-active');
              parentElement.removeChild(parentElement.getElementsByClassName('bigin-wf-error-parent-ele')[0]);
            }
          }
          function setError(fieldObj, label) {
            var parentElement = fieldObj.closest('.bigin-wf-field'),
              childEle = parentElement.getElementsByClassName('bigin-wf-error-parent-ele')[0];
            if(!childEle) {
              var errorParentEle = document.createElement('DIV'),
              spanEle = document.createElement('SPAN'),
              viewMoreEle = document.createElement('SPAN');
              spanEle.setAttribute('class', 'bigin-wf-field-error bigin-wf-field-error-long');
              spanEle.innerHTML = label;
              errorParentEle.classList.add('bigin-wf-error-parent-ele');
              errorParentEle.appendChild(spanEle);
              parentElement.append(errorParentEle);
              parentElement.classList.add('bigin-wf-field-error-active');
              if(spanEle.scrollWidth > parentElement.offsetWidth) {
                viewMoreEle.innerHTML = 'View More';
                viewMoreEle.classList.add('bigin-wf-error-view-more');
                errorParentEle.append(viewMoreEle);
                viewMoreEle.addEventListener('click', function() {
                errorParentEle.removeChild(viewMoreEle);
                spanEle.classList.remove('bigin-wf-field-error-long');
                });
              } else {
                spanEle.classList.remove('bigin-wf-field-error-long')
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
                var fLabel = validateFld[i].parentElement.parentElement.parentElement.getElementsByClassName('bigin-wf-label')[0].innerHTML;
                switch(validateFld[i].getAttribute('ftype')) {
                case 'string_rest_number':
                case 'string':
                  var isError = false,
                  errorKey = 'Only letters are allowed.';
                  if(validateFld[i].getAttribute('ftype') === 'string_rest_number' && validateFldVal.match((/\d/g)) !== null) {	
                    isError = true;
                  }else if(validateFld[i].hasAttribute('fmin')){
                    if(validateFldVal.length < parseInt(validateFld[i].getAttribute('fmin'))) {
                      errorKey = 'Your input must be at least ' +validateFld[i].getAttribute('fmin') + ' character(s).';
                      isError = true;
                    } else if(validateFldVal.length > parseInt(validateFld[i].getAttribute('fmax'))) {
                      errorKey = 'Your input should not exceed ' +validateFld[i].getAttribute('fmax') + ' character(s).';
                      isError = true;
                    }
                  }
                  if(isError){
                    setError(validateFld[i], errorKey);
                    isReturn = false;
                  }
                  break;
                case 'email':
                  if(validateFldVal.match(/^([A-Za-z0-9-._%'+/]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,22})$/) === null) {
                    setError(validateFld[i], 'Enter valid ' + fLabel);
                    isReturn = false;
                  }
                  break;
                case 'number':
                case 'double':
                  var isError = false,
                  errorKey = 'Enter valid ' + fLabel;
                  if((validateFld[i].getAttribute('ftype') === 'number' && validateFldVal.match(/^[0-9]+$/) === null)
                      || (validateFld[i].getAttribute('ftype') === 'double' && validateFldVal.match(/^[0-9]*(\.[0-9]{0,2})?$/) === null)) {
                    isError = true;
                  }else if(validateFld[i].hasAttribute('fmin')){
                    if(validateFldVal < parseInt(validateFld[i].getAttribute('fmin'))) {
                      errorKey = 'Enter a number greater than or equal to ' +validateFld[i].getAttribute('fmin');
                      isError = true;
                    } else if(validateFldVal > parseInt(validateFld[i].getAttribute('fmax'))) {
                      errorKey = 'Enter a number less than or equal to ' +validateFld[i].getAttribute('fmax');
                      isError = true;
                    }
                  }
                  if(isError){
                    setError(validateFld[i], errorKey);
                    isReturn = false;
                  }
                  break;
                case 'mobile':
                   if(validateFldVal.match(/^[0-9a-zA-Z+.()\-;\s]+$/) === null) {
                    setError(validateFld[i], 'Enter valid ' + fLabel);
                    isReturn = false;
                   }
                  break;
                 }
              }
            }
            return isReturn;
          }

          function validateForm${formId}() {
            var isReturn = true;
            var isNotCaptcha = false;
            for(i=0;i<mndFileds.length;i++) {
              var fieldObj=document.forms['BiginWebToRecordForm${formId}'][mndFileds[i]];
              if(fieldObj) {
                if (((fieldObj.value).replace(/^\\s+|\\s+$/g, '')).length==0) {
                  if(fieldObj.type =='file'){
                    setError(fieldObj, 'Please select a file to upload.'); 
                    isReturn = false;
                  }
                  else {
                    setError(fieldObj, fldLangVal[i] + ' cannot be empty');
                  isReturn= false;
                  }
                }  else if(fieldObj.nodeName=='SELECT') {
                  if(fieldObj.options[fieldObj.selectedIndex].value=='-None-') {
                  setError(fieldObj, fldLangVal[i] +' cannot be none.');
                  isReturn = false;
                 }
                } else if(fieldObj.type =='checkbox'){
                 if(fieldObj.checked == false){
                  setError(fieldObj, 'Please accept  '+fldLangVal[i]);
                  isReturn= false;
                  } 
               }
              }
            }
             isNotCaptcha = true;
            if(!validateFields${formId}()){isReturn = false;}
            if(!isReturn){
              var errEle = document.getElementsByClassName('bigin-wf-field-error');
              if(errEle && errEle.length >0){
                var inputEle = errEle[0].closest('.bigin-wf-field').getElementsByTagName('input');
                if(inputEle && inputEle.length == 0) {
                  inputEle = errEle[0].closest('.bigin-wf-field').getElementsByTagName('select');
                }
                if(inputEle && inputEle.length > 0) {
                  inputEle[0].focus();
                }
              }
            }else if(isNotCaptcha){
              var submitButton = document.getElementById('formsubmit');
              if (submitButton) {
                submitButton.disabled = true;
              }
            }
            return isReturn; 
          }

          document.getElementById('hidden${formId}Frame').addEventListener('load', function () {
            try {
              var doc = arguments[0].currentTarget.contentWindow.document;
              if(doc.body.childElementCount !== 0) {
                // Do not display the iframe, only hide the form
                var formParent = document.getElementById('BiginWebToRecordFormParent${formId}');
                if (formParent) {
                  formParent.style.display = 'none';
                }
                
                // Show success form
                var successMessage = document.createElement('div');
                successMessage.className = 'p-6 text-center';
                successMessage.innerHTML = \`
                  <div class="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 class="text-xl font-medium mb-2">${
                      locale === "en" ? "Thank you!" : "Obrigado!"
                    }</h3>
                    <p class="text-gray-600">${
                      locale === "en"
                        ? "Your message has been sent successfully!"
                        : "A sua mensagem foi enviada com sucesso!"
                    }</p>
                  </div>
                \`;
                
                // Add to the parent container of the form
                var formContainer = document.querySelector('.bigin-form-container');
                if (formContainer) {
                  formContainer.innerHTML = '';
                  formContainer.appendChild(successMessage);
                }
                
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
              }
            } catch (error) {
              var formParent = document.getElementById('BiginWebToRecordFormParent${formId}');
              if (formParent) {
                formParent.style.display = 'none';
              }
              
              // Show error form
              var errorMessage = document.createElement('div');
              errorMessage.className = 'p-6 text-center';
              errorMessage.innerHTML = \`
                <div class="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 class="text-xl font-medium mb-2">${
                    locale === "en" ? "Error" : "Erro"
                  }</h3>
                  <p class="text-gray-600">${
                    locale === "en"
                      ? "An error occurred while submitting the form. Please try again."
                      : "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
                  }</p>
                </div>
              \`;
              
              // Add to the parent container of the form
              var formContainer = document.querySelector('.bigin-form-container');
              if (formContainer) {
                formContainer.innerHTML = '';
                formContainer.appendChild(errorMessage);
              }
              
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

        formContainerRef.current.appendChild(script);

        // Add Zoho Bigin style with prefix to avoid conflicts
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = `
          /* BIGIN FORM STYLES - Encapsulated with bigin- prefix */
          .bigin-form-container {
            font-family: Arial, sans-serif;
          }
          
          .bigin-form-container .iframe-container {
            height: 100%;
            width: 100%;
            border: none;
            min-height: 365px;
          }
          
          .bigin-form-parent {
            background-color: transparent;
          }
          
          .bigin-form-wrapper {
            width: 100%;
            margin: auto;
            color: #222;
          }
          
          .bigin-wf-form-component {
            padding: 0;
            font-family: inherit;
            font-size: 15px;
          }
          
          .bigin-wf-form-wrapper {
            display: flex;
            flex-direction: column;
            gap: 22px;
          }
          
          .bigin-wf-row {
            margin-bottom: 0;
          }
          
          .bigin-wf-label {
            padding: 0 0 8px;
            word-break: break-word;
            font-weight: 500;
            color: #4a5568;
            font-size: 14px;
            letter-spacing: 0.02em;
          }
          
          .bigin-wf-field {
            text-align: left;
            word-break: break-word;
            border: 0;
            position: relative;
          }
          
          .bigin-wf-field-inner {
            position: relative;
            display: flex;
            flex: 1;
          }
          
          .bigin-wf-field-mandatory .bigin-wf-field-inner::before {
            content: '';
            position: absolute;
            left: 0px;
            background-color: #4299e1;
            width: 3px;
            height: 100%;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            z-index: 2;
            top: 0;
            bottom: 0;
          }
          
          .bigin-wf-field-input, .bigin-wf-field-dropdown {
            width: 100%;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 16px;
            min-height: 46px;
            font-size: 15px;
            font-family: inherit;
            transition: all 0.2s ease;
            background-color: #fff;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
          
          .bigin-wf-field-input:focus, .bigin-wf-field-dropdown:focus {
            border-color: #4299e1;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
            outline: none;
          }
          
          .bigin-wf-field-input:hover, .bigin-wf-field-dropdown:hover {
            border-color: #cbd5e0;
          }
          
          .bigin-wform-btn-wrap {
            display: flex;
            margin-top: 10px;
            align-items: center;
            justify-content: flex-start;
          }
          
          .bigin-wf-btn {
            padding: 12px 28px;
            border-radius: 8px;
            font-size: 15px;
            cursor: pointer;
            font-weight: 600;
            font-family: inherit;
            background-color: #4299e1;
            color: #fff;
            border: none;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
            width: 100%;
            letter-spacing: 0.02em;
          }
          
          .bigin-wf-btn:hover {
            background-color: #3182ce;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
          }
          
          .bigin-wf-btn:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
          
          .bigin-wform-poweredby-container {
            position: absolute;
            left: 0;
            bottom: -40px;
            border-top-right-radius: 6px;
            border-bottom-left-radius: 6px;
            background-color: #2d3748;
            font-size: 11px;
            padding: 5px 7px;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            color: #fff;
            text-decoration: none;
            opacity: 0.8;
            transition: opacity 0.2s ease;
          }
          
          .bigin-wform-poweredby-container:hover {
            opacity: 1;
          }
          
          /* ERROR STYLES */
          .bigin-wf-field-error {
            color: #e53e3e;
            font-size: 12px;
            margin-top: 6px;
            display: none;
          }
          
          .bigin-wf-field-error-active.bigin-wf-field .bigin-wf-field-error {
            display: block;
          }
          
          .bigin-wf-field-error-active.bigin-wf-field .bigin-wf-error-view-more {
            display: flex;
          }
          
          .bigin-wf-field-error-active.bigin-wf-field .bigin-wf-field-input,
          .bigin-wf-field-error-active.bigin-wf-field .bigin-wf-field-dropdown {
            border: 1px solid #e53e3e;
            box-shadow: 0 0 0 1px rgba(229, 62, 62, 0.3);
          }
          
          /* RESPONSIVE */
          @media screen and (max-width: 768px) {
            .bigin-wf-field-input, .bigin-wf-field-dropdown {
              width: 100% !important;
            }
            
            .bigin-wf-label:empty {
              display: none;
            }
          }
          
          @media screen and (max-width: 590px) {
            .bigin-wf-form-component {
              padding: 0;
            }
          }
        `;

        formContainerRef.current.appendChild(style);
      }

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
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
      <div
        ref={formContainerRef}
        className="bigin-form-container relative"
      ></div>
    </div>
  );
}
