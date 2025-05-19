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

    const loadBiginForm = () => {
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = "";
      }

      const formId = "826879000000499617";
      const xnQsjsdp = "01d8af217625e186ab5e602a57a4634b04d671ec6ea6036fb834ae37de939989";
      const xmIwtLD = "0db60033eacff61476d4077b1995990d1a2ca9c0bb2b3283051b7fb0a2be8d2279e1d1b2621fe152926ec82857105bbd";

      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = `
          <iframe id='hidden${formId}Frame' name='hidden${formId}Frame' style='display: none;' class='iframe-container'></iframe>
          <div class='wf-parent' id='BiginWebToRecordFormParent${formId}'>
            <div class='wf-wrapper' id='BiginWebToRecordFormDiv${formId}'>
              <meta name='viewport' content='width=device-width, initial-scale=1.0'>
              <META HTTP-EQUIV='content-type' CONTENT='text/html;charset=UTF-8'>
              <form id='BiginWebToRecordForm${formId}' name='BiginWebToRecordForm${formId}' class='wf-form-component' data-ux-form-alignment='top' style='font-family: Arial;position: relative;font-size:15px;' method='POST' enctype='multipart/form-data' target='hidden${formId}Frame' onSubmit='javascript:document.charset="UTF-8"; return checkMandatory${formId}()' accept-charset='UTF-8'>
                <input type='text' style='display:none;' name='xnQsjsdp' value='${xnQsjsdp}'/>
                <input type='hidden' name='zc_gad' id='zc_gad' value=''/>
                <input type='text' style='display:none;' name='xmIwtLD' value='${xmIwtLD}'/>
                <input type='text' style='display:none;' name='actionType' value='UG90ZW50aWFscw=='/>
                <input type='hidden' name='rmsg' id='rmsg' value='true'/>
                <input type='text' style='display:none;' name='returnURL' value='null' />
                <div class='wf-header'>${locale === "en" ? "Book a trial class" : "Pedido de aula experimental"}</div>
                <div id='elementDiv${formId}' class='wf-form-wrapper'>
                  <div class='wf-row'>  
                    <div class='wf-label'>${locale === "en" ? "First Name" : "Nome"}</div>
                    <div class='wf-field wf-field-mandatory'>
                      <div class='wf-field-inner'>
                        <input name='Potential Name' maxlength='120' type='text' value='' class='wf-field-item wf-field-input' oninput='removeError(this)' placeholder='${locale === "en" ? "John" : "João"}'/>
                      </div>
                    </div>
                  </div>
                  <div class='wf-row'>  
                    <div class='wf-label'>${locale === "en" ? "Last Name" : "Apelido"}</div>
                    <div class='wf-field wf-field-mandatory'>
                      <div class='wf-field-inner'>
                        <input name='Contacts.Last Name' maxlength='80' type='text' value='' class='wf-field-item wf-field-input' oninput='removeError(this)' placeholder='${locale === "en" ? "Smith" : "Silva"}'/>
                      </div>
                    </div>
                  </div>
                  <div class='wf-row'>  
                    <div class='wf-label'>${locale === "en" ? "Mobile" : "Telemóvel"}</div>
                    <div class='wf-field'>
                      <div class='wf-field-inner'>
                        <input fvalidate='true' ftype='mobile' name='Contacts.Mobile' maxlength='30' type='text' value='' class='wf-field-item wf-field-input' oninput='removeError(this)' placeholder='+351 912 345 678'/>
                      </div>
                    </div>
                  </div>
                  <div class='wf-row'>  
                    <div class='wf-label'>${locale === "en" ? "Email" : "Email"}</div>
                    <div class='wf-field'>
                      <div class='wf-field-inner'>
                        <input fvalidate='true' ftype='email' name='Contacts.Email' maxlength='100' type='text' value='' class='wf-field-item wf-field-input' oninput='removeError(this)' placeholder='email@example.com'/>
                      </div>
                    </div>
                  </div>
                  <div class='wf-row' style='display:none;'>  
                    <div class='wf-label'>Sub-Pipeline</div>
                    <div class='wf-field'>
                      <div class='wf-field-inner dropdown-contents'>
                        <select name='Pipeline' class='wf-field-item wf-field-dropdown' data-wform-field='select' onchange='removeError(this);'>
                          <option selected value='Sales&#x20;Pipeline&#x20;Standard'>Sales Pipeline Standard</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class='wf-row' style='display:none;'>  
                    <div class='wf-label'>Stage</div>
                    <div class='wf-field'>
                      <div class='wf-field-inner dropdown-contents'>
                        <select name='Stage' class='wf-field-item wf-field-dropdown' data-wform-field='select' onchange='removeError(this);'>
                          <option selected value='Qualification'>Qualification</option>
                          <option value='Book&#x20;trial&#x20;class'>Book trial class</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class='wform-btn-wrap' data-ux-pos='left'>
                    <input id='formsubmit' type='submit' class='wf-btn' data-ux-btn-type='default' style='background-color:#1980d8; color: #fff; border: 1px solid #1980d8;width: auto;' value='${locale === "en" ? "Submit" : "Enviar"}'/>
                  </div>
                </div>
                <a class='wform-poweredby-container' target='_blank' href='https://zoho.eu/bigin/?utm_source=biginwebforms&utm_medium=organic&utm_id=product' id='poweredBy${formId}'>
                  <span style='padding-right: 5px;color: #C5D4E5;'>Powered by</span>
                  <img src='https://bigin.zoho.eu/images/bigin-logo-xs.svg' style='margin-right: 5px;'/>
                  <span>Bigin</span>
                </a>
              </form>
            </div>
          </div>
        `;

        // Add validation script
        const script = document.createElement("script");
        script.innerHTML = `
          var mndFileds=new Array('Potential\\x20Name','Contacts.Last\\x20Name');
          var fldLangVal=new Array('${locale === "en" ? "First Name" : "Nome"}','${locale === "en" ? "Last Name" : "Apelido"}');
          var wfInnerWidth = window.innerWidth;
          if(wfInnerWidth <= 768){
            document.forms['BiginWebToRecordForm${formId}'].setAttribute('data-ux-form-alignment', 'top');
          }
          function removeError(fieldObj) {
            var parentElement = fieldObj.closest('.wf-field'),
              childEle = parentElement.getElementsByClassName('wf-error-parent-ele')[0];
            if(childEle) {
              parentElement.classList.remove('wf-field-error-active');
              parentElement.removeChild(parentElement.getElementsByClassName('wf-error-parent-ele')[0]);
            }
          }
          function setError(fieldObj, label) {
            var parentElement = fieldObj.closest('.wf-field'),
              childEle = parentElement.getElementsByClassName('wf-error-parent-ele')[0];
            if(!childEle) {
              var errorParentEle = document.createElement('DIV'),
              spanEle = document.createElement('SPAN'),
              viewMoreEle = document.createElement('SPAN');
              spanEle.setAttribute('class', 'wf-field-error wf-field-error-long');
              spanEle.innerHTML = label;
              errorParentEle.classList.add('wf-error-parent-ele');
              errorParentEle.appendChild(spanEle);
              parentElement.append(errorParentEle);
              parentElement.classList.add('wf-field-error-active');
              if(spanEle.scrollWidth > parentElement.offsetWidth) {
                viewMoreEle.innerHTML = 'View More';
                viewMoreEle.classList.add('wf-error-view-more');
                errorParentEle.append(viewMoreEle);
                viewMoreEle.addEventListener('click', function() {
                  errorParentEle.removeChild(viewMoreEle);
                  spanEle.classList.remove('wf-field-error-long');
                });
              } else {
                spanEle.classList.remove('wf-field-error-long')
              }
            }
          }
          function validateFields${formId}() {
            var isReturn = true;
            var form = document.forms['BiginWebToRecordForm${formId}'];
            var validateFld = form.querySelectorAll('[fvalidate=true]');
            var i;
            for (i = 0; i < validateFld.length; i++) {
              var validateFldVal = validateFld[i].value;
              if(validateFldVal !== '') {
                var fLabel = validateFld[i].parentElement.parentElement.parentElement.getElementsByClassName('wf-label')[0].innerHTML;
                switch(validateFld[i].getAttribute('ftype')) {
                  case 'string_rest_number':
                  case 'string':
                    var isError = false,
                    errorKey = '${locale === "en" ? "Only letters are allowed." : "Apenas letras são permitidas."}';
                    if(validateFld[i].getAttribute('ftype') === 'string_rest_number' && validateFldVal.match((/\\d/g)) !== null) {	
                      isError = true;
                    }else if(validateFld[i].hasAttribute('fmin')){
                      if(validateFldVal.length < parseInt(validateFld[i].getAttribute('fmin'))) {
                        errorKey = '${locale === "en" ? "Your input must be at least " : "O seu texto deve ter pelo menos "}' +validateFld[i].getAttribute('fmin') + '${locale === "en" ? " character(s)." : " caractere(s)."}';
                        isError = true;
                      } else if(validateFldVal.length > parseInt(validateFld[i].getAttribute('fmax'))) {
                        errorKey = '${locale === "en" ? "Your input should not exceed " : "O seu texto não deve exceder "}' +validateFld[i].getAttribute('fmax') + '${locale === "en" ? " character(s)." : " caractere(s)."}';
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
                      setError(validateFld[i], '${locale === "en" ? "Enter valid " : "Insira um "}' + fLabel + '${locale === "en" ? "" : " válido"}');
                      isReturn = false;
                    }
                    break;
                  case 'mobile':
                    if(validateFldVal.match(/^[0-9a-zA-Z+.()\-;\s]+$/) === null) {
                      setError(validateFld[i], '${locale === "en" ? "Enter valid " : "Insira um "}' + fLabel + '${locale === "en" ? "" : " válido"}');
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
            var isNotCaptcha = false;
            for(i=0;i<mndFileds.length;i++) {
              var fieldObj=document.forms['BiginWebToRecordForm${formId}'][mndFileds[i]];
              if(fieldObj) {
                if (((fieldObj.value).replace(/^\\s+|\\s+$/g, '')).length==0) {
                  if(fieldObj.type =='file'){
                    setError(fieldObj, '${locale === "en" ? "Please select a file to upload." : "Por favor, selecione um ficheiro para enviar."}'); 
                    isReturn = false;
                  }
                  else {
                    setError(fieldObj, fldLangVal[i] + '${locale === "en" ? " cannot be empty" : " não pode estar vazio"}');
                    isReturn= false;
                  }
                }  else if(fieldObj.nodeName=='SELECT') {
                  if(fieldObj.options[fieldObj.selectedIndex].value=='-None-') {
                    setError(fieldObj, fldLangVal[i] +'${locale === "en" ? " cannot be none." : " não pode ser nenhum."}');
                    isReturn = false;
                  }
                } else if(fieldObj.type =='checkbox'){
                  if(fieldObj.checked == false){
                    setError(fieldObj, '${locale === "en" ? "Please accept " : "Por favor, aceite "}'+fldLangVal[i]);
                    isReturn= false;
                  } 
                }
              }
            }
            isNotCaptcha = true;
            if(!validateFields${formId}()){isReturn = false;}
            if(!isReturn){
              var errEle = document.getElementsByClassName('wf-field-error');
              if(errEle && errEle.length >0){
                var inputEle = errEle[0].closest('.wf-field').getElementsByTagName('input');
                if(inputEle && inputEle.length == 0) {
                  inputEle = errEle[0].closest('.wf-field').getElementsByTagName('select');
                }
                if(inputEle && inputEle.length > 0) {
                  inputEle[0].focus();
                }
              }
            }else if(isNotCaptcha){
              document.getElementById('formsubmit').disabled = true;
            }
            return isReturn; 
          }

          document.getElementById('hidden${formId}Frame').addEventListener('load', function () {
            try {
              var doc = arguments[0].currentTarget.contentWindow.document;
              if(doc.body.childElementCount !== 0) {
                arguments[0].currentTarget.style.display = 'block';
                document.getElementById('BiginWebToRecordFormParent${formId}').style.display = 'none';
              }
            } catch (error) {
              arguments[0].currentTarget.style.display = 'block';
              document.getElementById('BiginWebToRecordFormParent${formId}').style.display = 'none'
            }
          });
        `;

        formContainerRef.current.appendChild(script);

        // Add Zoho Bigin style
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = `
          .wf-form-component {
            padding: 30px 40px 60px;
            background: #ffffff;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          }

          .wf-parent {
            padding: 30px 0;
            height: 100%;
            box-sizing: border-box;
            overflow: auto;
            background: transparent;
          }

          .wf-wrapper * {
            box-sizing: border-box;
          }

          .wf-wrapper {
            width: 100%;
            max-width: 700px;
            border-radius: 1rem;
            margin: auto;
            border: none;
            background-color: #fff;
            color: #1a1a1a;
            transition: all 0.25s ease;
          }

          .iframe-container {
            height: 100%;
            width: 100%;
            border: none;
            min-height: 365px;
          }

          .wf-header {
            font-size: 1.75rem;
            padding-bottom: 2rem;
            font-weight: 600;
            word-break: break-word;
            color: #1a1a1a;
            letter-spacing: -0.01em;
            text-align: center;
          }

          .wf-row {
            margin-bottom: 1.5rem;
          }

          .wf-label {
            padding: 0.25rem 0;
            word-break: break-word;
            font-weight: 500;
            color: #4a5568;
            font-size: 0.9rem;
            letter-spacing: 0.01em;
          }

          .wf-field:not(.multiple-fields-div) {
            text-align: left;
            word-break: break-word;
            border: 0;
            position: relative;
          }

          .wf-field-inner {
            position: relative;
            display: flex;
            flex: 1;
          }

          .wf-field-mandatory .wf-field-inner::before {
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
            transition: all 0.2s ease;
          }

          .wf-field-input,
          .wf-field-dropdown {
            width: 100%;
            border: 1px solid #e2e8f0;
            border-radius: 0.75rem;
            padding: 0.75rem 1.25rem;
            min-height: 3rem;
            font-size: 0.95rem;
            font-family: inherit;
            background-color: #fff;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          }

          .wf-field-input::placeholder {
            color: #a0aec0;
          }

          .wf-field-input:hover,
          .wf-field-dropdown:hover {
            border-color: #cbd5e0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
          }

          .wf-field-input:focus,
          .wf-field-dropdown:focus {
            border-color: #4299e1;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
            outline: none;
          }

          .wf-field-error {
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: none;
            animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
          }

          .wf-field-error-active .wf-field-error {
            display: block;
          }

          .wf-field-error-active .wf-field-input,
          .wf-field-error-active .wf-field-dropdown {
            border: 1px solid #e53e3e;
            box-shadow: 0 0 0 1px rgba(229, 62, 62, 0.3);
          }

          .wf-btn {
            padding: 0.85rem 2rem;
            border-radius: 0.75rem;
            font-size: 1rem;
            cursor: pointer;
            font-weight: 600;
            font-family: inherit;
            background-color: #4299e1;
            color: #fff;
            border: none;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);
            letter-spacing: 0.01em;
            width: 100%;
          }

          .wf-btn:hover {
            background-color: #3182ce;
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(66, 153, 225, 0.25);
          }

          .wf-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(66, 153, 225, 0.2);
          }

          .wform-btn-wrap {
            display: flex;
            margin-top: 2rem;
            align-items: center;
            justify-content: center;
            flex: 1;
          }

          .wform-poweredby-container {
            position: absolute;
            left: 0;
            bottom: 0;
            border-top-right-radius: 0.75rem;
            border-bottom-left-radius: 0.75rem;
            background-color: #2d3748;
            font-size: 0.75rem;
            padding: 0.4rem 0.6rem;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            color: #fff;
            text-decoration: none;
            opacity: 0.7;
            transition: opacity 0.2s ease;
          }

          .wform-poweredby-container:hover {
            opacity: 1;
          }

          @keyframes shake {
            10%,90% {transform: translate3d(-1px, 0, 0);}
            20%,80% {transform: translate3d(2px, 0, 0);}
            30%,50%,70% {transform: translate3d(-4px, 0, 0);}
            40%,60% {transform: translate3d(4px, 0, 0);}
          }

          @media screen and (max-width: 1024px) {
            .wf-wrapper {
              max-width: 700px;
              width: calc(100% - 40px);
              border: 0;
            }
            .wf-field input[type=text],
            .wf-field select,
            .wf-field textarea {
              width: 100% !important;
            }
            .wf-label:empty {
              display: none;
            }
          }

          @media screen and (max-width: 768px) {
            .wf-wrapper {
              max-width: 700px;
              width: calc(100% - 40px);
              border: 0;
            }
            .wf-field input[type=text],
            .wf-field select,
            .wf-field textarea {
              width: 100% !important;
            }
            .wf-label:empty {
              display: none;
            }
            .wf-form-component[data-ux-form-alignment='top'] .wform-btn-wrap {
              justify-content: center;
            }
          }

          @media screen and (max-width: 590px) {
            .wf-parent {
              padding: 20px 0;
            }
            .wf-wrapper {
              width: calc(100% - 30px) !Important;
              border: 0;
            }
            .wf-form-component {
              padding: 1.5rem;
              padding-bottom: 3.5rem;
            }
            .wf-field input[type=text],
            .wf-field select,
            .wf-field textarea {
              width: 100% !important;
            }
            .wf-label:empty {
              display: none;
            }
          }
        `;

        formContainerRef.current.appendChild(style);

        // Add Zoho Bigin script
        const biginScript = document.createElement("script");
        biginScript.id = "wf_script";
        biginScript.src = `https://bigin.zoho.eu/crm/WebformScriptServlet?rid=${xmIwtLD}gid${xnQsjsdp}`;
        formContainerRef.current.appendChild(biginScript);
      }

      scriptLoaded.current = true;
    };

    loadBiginForm();

    return () => {
      scriptLoaded.current = false;
    };
  }, [locale, title, subtitle]);

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

  const containerClasses = transparent
    ? `${className}`
    : `${className} bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 overflow-hidden transition-all hover:shadow-xl`;

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
