package phaselisteners;

import javax.faces.application.ConfigurableNavigationHandler;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import model.User;

public class SessionExpirationPhaseListener implements PhaseListener{
	
	private Logger logger = Logger.getLogger(SessionExpirationPhaseListener.class);
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void afterPhase(PhaseEvent event) {
		FacesContext context = FacesContext.getCurrentInstance();
		
		HttpServletRequest httpRequest = (HttpServletRequest) context.getExternalContext().getRequest();
		
		User u = (User) httpRequest.getSession().getAttribute("sessionuser");
		
		if (u == null) {
			if (httpRequest.getHeader("referer") != null) {
				if(
						(( !httpRequest.getHeader("referer").toString().endsWith("login.jsf")
						&& !httpRequest.getHeader("referer").toString().endsWith("RFT")
						&& !httpRequest.getHeader("referer").toString().endsWith("RFT/"))
								&& (httpRequest.getHeader("Faces-Request") !=null 
								&& httpRequest.getHeader("Faces-Request").equals("partial/ajax"))
								)
				  ){
					try {
						logger.info("redirect");
						context.getExternalContext().redirect("/RFT");
					} catch (Exception e) {
						logger.error(e.getMessage());
						e.printStackTrace();
					}
				}
			}
		}
		
		if (httpRequest.getRequestedSessionId() != null && !httpRequest.isRequestedSessionIdValid()) {
			String facesRequestHeader = httpRequest.getHeader("Faces-Request");
			boolean isAjaxRequest = facesRequestHeader != null && facesRequestHeader.equals("partial/ajax");
			if (isAjaxRequest) {
				logger.trace("it was ajax");
				ConfigurableNavigationHandler handler = (ConfigurableNavigationHandler) context.getApplication().getNavigationHandler();
				handler.performNavigation("/login");
			}else{
				logger.trace("NOT AJAX");
			}
		}
		
	}

	@Override
	public void beforePhase(PhaseEvent event) {}

	@Override
	public PhaseId getPhaseId() {
		return PhaseId.RESTORE_VIEW;
	}

}
