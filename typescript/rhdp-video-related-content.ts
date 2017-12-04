class RHDPVideoRelatedContent extends HTMLElement {
    _result;
    _url = ['',''];
    _title;
    _kind;

    get url() {
        return this._url;
    }

    set url(val) {
        if (this._url === val) return;
        this._url = val;
    }

    get title() {
        return this._title;
    }

    set title(val) {
        if (this._title === val) return;
        this._title = val;
    }

    get kind() {
        return this._kind;
    }

    set kind(val) {
        if (this._kind === val) return;
        this._kind = val;
    }

    get result() {
        return this._result;
    }

    set result(val) {
        if (this._result === val) return;
        this._result = val;
        this.computeTitle(val);
        this.computeKind(val);
        this.computeURL(val);
        this.renderResult();

    }

    constructor() {
        super();
    }

    template = (strings, url, title, kind) => {
        return `<div>
            <h4>${url ? `<a href="${url}">${title}</a>` : title}</h4>
            <p>
                <span class="caps">${kind}</span>
            </p>
        </div>`; 
    };

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['result']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    renderResult() {
        this.innerHTML = this.template`${this.url}${this.title}${this.kind}`;
    }

    computeTitle(result) { 
        var title = '';
        if(result.highlight && result.highlight.sys_title) {
            title = result.highlight.sys_title[0];
        } else {
            title = result.fields.sys_title[0];
        }
        this.title = title; 
    }
    computeKind(result) {
        var kind = result.fields.sys_type || "webpage",
        map = {
            jbossdeveloper_archetype: 'Archetype',
            article: 'Article',
            blogpost: 'Blog Post',
            jbossdeveloper_bom: 'Bom',
            book: 'Book',
            cheatsheet: 'Cheat Sheet',
            demo: 'Demo',
            event: 'Event',
            forumthread: 'Forum Thread',
            jbossdeveloper_example: 'Demo',
            quickstart: 'Quickstart',
            quickstart_early_access: 'Demo',
            solution: 'Article',
            stackoverflow_thread: 'Stack Overflow',
            video: 'Video',
            webpage: 'Web Page',
            website: 'Web Page'
        };
        this.kind = map[kind] || 'Web Page';
    }
    computeURL(result) {
        var url = ['',''];
        if(result.fields && result.fields.sys_url_view) {
            url[0] = `<a href="${result.fields.sys_url_view}">`;
            url[1] = '</a>';
        }
        this.url = (result.fields && result.fields.sys_url_view) ? result.fields.sys_url_view : '';
    }
}

customElements.define('rhdp-video-related-content', RHDPVideoRelatedContent);