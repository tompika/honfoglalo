package exceptions;

import java.util.Iterator;
import java.util.Map;

import javax.faces.FacesException;
import javax.faces.application.NavigationHandler;
import javax.faces.application.ViewExpiredException;
import javax.faces.context.ExceptionHandler;
import javax.faces.context.ExceptionHandlerWrapper;
import javax.faces.context.FacesContext;
import javax.faces.event.ExceptionQueuedEvent;
import javax.faces.event.ExceptionQueuedEventContext;

import org.apache.log4j.Logger;

public class CustomExceptionHandler extends ExceptionHandlerWrapper {
	private static Logger logger = Logger.getLogger(CustomExceptionHandler.class);
    private ExceptionHandler wrapped;

    @SuppressWarnings("deprecation")
	CustomExceptionHandler(ExceptionHandler exception) {
        this.wrapped = exception;
    }

    @Override
    public ExceptionHandler getWrapped() {
        return wrapped;
    }

    @Override
    public void handle() throws FacesException {
        final Iterator<ExceptionQueuedEvent> i = getUnhandledExceptionQueuedEvents().iterator();
        while (i.hasNext()) {
            ExceptionQueuedEvent event = i.next();
            ExceptionQueuedEventContext context
                    = (ExceptionQueuedEventContext) event.getSource();

            Throwable t = context.getException();

            final FacesContext fc = FacesContext.getCurrentInstance();
            final Map<String, Object> requestMap = fc.getExternalContext().getRequestMap();
            final NavigationHandler nav = fc.getApplication().getNavigationHandler();

            try {
            	logger.info("ViewExpired");
                if (t instanceof ViewExpiredException) {
                    requestMap.put("javax.servlet.error.message", "Session expired, try again!");
                    String errorPageLocation = "/login.xhtml";
                    fc.setViewRoot(fc.getApplication().getViewHandler().createView(fc, errorPageLocation));
                    fc.getPartialViewContext().setRenderAll(true);
                    fc.renderResponse();
                } else {
                    //redirect error page
                    requestMap.put("javax.servlet.error.message", t.getMessage());
                    nav.handleNavigation(fc, null, "/error.xhtml");
                }
                fc.renderResponse();
                
            } finally {
                i.remove();
            }
        }
        getWrapped().handle();
    }
}
